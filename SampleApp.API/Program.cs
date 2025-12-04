using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using SampleApp.API.Data;
using SampleApp.API.Extensions;
using SampleApp.API.Interfaces;
using SampleApp.API.Middlewares;
using SampleApp.API.Repositories;
using SampleApp.API.Services;
using SampleApp.API.Validations;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

builder.Services.AddScoped<IUserRepository, UsersRepository>();
builder.Services.AddScoped<IMicropostRepository, MicropostRepository>();
builder.Services.AddCors();
builder.Services.AddDbContext<SampleAppContext>(o =>
    o.UseNpgsql(builder.Configuration["ConnectionStrings:PostgreSQL"])
);
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddJwtServices(builder.Configuration);
builder.Services.AddAuthorization();

// builder.Services.AddValidatorsFromAssemblyContaining<UserValidator>();
// builder.Services.AddValidatorsFromAssemblyContaining<MicropostValidator>();
// builder.Services.AddValidatorsFromAssemblyContaining<Program>();

builder.Services.AddFluentValidationServices();

var app = builder.Build();
app.UseMiddleware<ExceptionHandlerMiddleware>();
app.UseSwagger();
app.UseSwaggerUI();
app.UseAuthentication();
app.UseAuthorization();
app.UseCors(o => o.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
app.MapControllers();
app.Run();
