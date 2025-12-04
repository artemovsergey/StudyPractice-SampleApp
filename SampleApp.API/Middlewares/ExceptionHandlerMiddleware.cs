using System.Net;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using SampleApp.API.Exceptions;
using SampleApp.API.Response;

namespace SampleApp.API.Middlewares;

public class ExceptionHandlerMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlerMiddleware> _logger;
    private readonly IHostEnvironment _env;

    public ExceptionHandlerMiddleware(
        RequestDelegate next,
        ILogger<ExceptionHandlerMiddleware> logger,
        IHostEnvironment env
    )
    {
        _env = env;
        _logger = logger;
        _next = next;
    }

    // когда мы работаем с middleware у нас есть доступ к контексту HttpContext
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            // мы получим контекст http и передадим его дальше другому middleware вниз
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogWarning("Возникла ошибка...");
            _logger.LogError(ex, ex.Message);
            await ConvertExceptionAsync(context, ex);
        }
    }

    private Task ConvertExceptionAsync(HttpContext context, System.Exception exception)
    {
        context.Response.ContentType = "application/json";
        var httpStatusCode = HttpStatusCode.InternalServerError;

        var message = string.Empty;
        var messagedetail = string.Empty;

        switch (exception)
        {
            case DbUpdateException dbUpdateEx:
                // Если это DbUpdateException, проверяем его InnerException
                if (dbUpdateEx.InnerException is Npgsql.PostgresException pgEx)
                {
                    httpStatusCode = HttpStatusCode.BadRequest;
                    message = "Database error occurred";

                    if (pgEx.SqlState == "23503")
                    {
                        message =
                            "Foreign key constraint violation. The referenced record does not exist.";
                    }

                    messagedetail = pgEx.Message;
                    break;
                }
                // Если не PostgresException, обрабатываем как общую ошибку БД
                httpStatusCode = HttpStatusCode.BadRequest;
                message = "Error occurred while saving data";
                messagedetail = dbUpdateEx.Message;
                break;

            case BadHttpRequestException badRequestException:
                httpStatusCode = HttpStatusCode.BadRequest;
                message = badRequestException.Message;
                messagedetail = badRequestException.StackTrace?.ToString();
                break;

            case NotFoundException ex:
                httpStatusCode = HttpStatusCode.NotFound;
                message = ex.Message;
                messagedetail = ex.StackTrace?.ToString();
                break;

            case Exception ex:
                httpStatusCode = HttpStatusCode.InternalServerError;
                message = ex.Message;
                messagedetail = ex.StackTrace?.ToString();
                break;
        }

        context.Response.StatusCode = (int)httpStatusCode;

        var response = _env.IsDevelopment()
            ? new ErrorResponse(context.Response.StatusCode.ToString(), message, messagedetail)
            : new ErrorResponse(context.Response.StatusCode.ToString(), "Internal Server Error");

        var options = new JsonSerializerOptions()
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        };
        var result = JsonSerializer.Serialize(response, options);
        return context.Response.WriteAsync(result);
    }
}
