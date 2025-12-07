using System.Text.Json.Serialization;

namespace SampleApp.API.Extensions;

public static class ControllerService
{
    public static IServiceCollection AddControllerServices(this IServiceCollection services)
    {
        services
            .AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
                options.JsonSerializerOptions.DefaultIgnoreCondition =
                    JsonIgnoreCondition.WhenWritingNull;
            });

        return services;
    }
}
