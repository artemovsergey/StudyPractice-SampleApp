using Microsoft.EntityFrameworkCore;
using SampleApp.API.Data;
using SampleApp.API.Extensions;
using SampleApp.API.Interfaces;
using SampleApp.API.Repositories;
using SampleApp.API.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

builder.Services.AddScoped<IUserRepository, UsersRepository>();
builder.Services.AddCors();
builder.Services.AddDbContext<SampleAppContext>(o =>
    o.UseNpgsql(builder.Configuration["ConnectionStrings:PostgreSQL"])
);
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddJwtServices(builder.Configuration);
builder.Services.AddAuthorization();

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();
app.UseAuthentication();
app.UseAuthorization();
app.UseCors(o => o.AllowAnyOrigin().AllowAnyHeader());
app.MapControllers();
app.Run();
