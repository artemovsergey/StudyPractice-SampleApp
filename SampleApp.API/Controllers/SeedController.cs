using System.Security.Cryptography;
using System.Text;
using Bogus;
using Microsoft.AspNetCore.Mvc;
using SampleApp.API.Data;
using SampleApp.API.Dtos;
using SampleApp.API.Entities;
using Swashbuckle.AspNetCore.Annotations;

namespace SampleApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SeedController(SampleAppContext db) : ControllerBase
{
    [SwaggerOperation(
        Summary = "Генерация тестовых пользователей",
        Description = "Возвращает список сгенерируемых пользователей",
        OperationId = "SeedUsers"
    )]
    [SwaggerResponse(200, "Пользователи сгенерированы успешно", typeof(List<User>))]
    [HttpGet("generate")]
    public ActionResult SeedUsers()
    {
        using var hmac = new HMACSHA256();

        Faker<UserDto> _faker = new Faker<UserDto>("en")
            .RuleFor(u => u.Login, f => GenerateLogin(f).Trim())
            .RuleFor(u => u.Password, f => GeneratePassword(f).Trim().Replace(" ", ""));

        string GenerateLogin(Faker faker)
        {
            return faker.Random.Word() + faker.Random.Number(3, 5);
        }

        string GeneratePassword(Faker faker)
        {
            return faker.Random.Word() + faker.Random.Number(3, 5);
        }

        var users = _faker.Generate(100).Where(u => u.Login.Length > 4 && u.Login.Length <= 10);

        List<User> userToDb = new List<User>();

        try
        {
            foreach (var user in users)
            {
                var u = new User()
                {
                    Login = user.Login,
                    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(user.Password)),
                    PasswordSalt = hmac.Key,
                };
                userToDb.Add(u);
            }
            db.Users.AddRange(userToDb);
            db.SaveChanges();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"{ex.InnerException!.Message}");
        }

        return Ok(userToDb);
    }
}
