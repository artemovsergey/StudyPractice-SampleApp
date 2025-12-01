using System.Security.Cryptography;
using System.Text;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SampleApp.API.Dtos;
using SampleApp.API.Entities;
using SampleApp.API.Interfaces;
using SampleApp.API.Validations;
using Swashbuckle.AspNetCore.Annotations;

namespace SampleApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserRepository _repo;
    private readonly ITokenService _ts;
    private HMACSHA256 hmac = new HMACSHA256();

    public UsersController(IUserRepository repo, ITokenService ts)
    {
        _repo = repo;
        _ts = ts;
    }

    [SwaggerOperation(
        Summary = "Создание пользователя",
        Description = "Возвращает нового пользователя",
        OperationId = "CreateUser"
    )]
    [SwaggerResponse(200, "Пользователь создан успешно", typeof(User))]
    [HttpPost]
    public ActionResult CreateUser(UserDto userDto)
    {
        // var validator = new UserValidator();
        // var result = validator.Validate(userDto);

        // if (!result.IsValid)
        // {
        //     throw new Exception($"{result.Errors.First().ErrorMessage}");
        // }

        var user = new User()
        {
            Login = userDto.Login,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDto.Password)),
            PasswordSalt = hmac.Key,
            Name = "",
            Token = _ts.CreateToken(userDto.Login),
        };

        return Ok(_repo.CreateUser(user));
    }

    [Authorize]
    [SwaggerOperation(
        Summary = "Получение списка пользователей",
        Description = "Возвращает все пользователей",
        OperationId = "GetUsers"
    )]
    [SwaggerResponse(200, "Список пользователей получен успешно", typeof(List<User>))]
    [SwaggerResponse(404, "Пользователи не найдены")]
    [HttpGet]
    public ActionResult GetUsers()
    {
        return Ok(_repo.GetUsers());
    }

    [SwaggerOperation(
        Summary = "Обновление пользователя",
        Description = "Возвращает отредактированного пользователя",
        OperationId = "UpdateUser"
    )]
    [SwaggerResponse(200, "Пользователь обновлен успешно", typeof(User))]
    [SwaggerResponse(404, "Пользователь не найден")]
    [HttpPut]
    public ActionResult UpdateUser(User user)
    {
        return Ok(_repo.EditUser(user, user.Id));
    }

    [SwaggerOperation(
        Summary = "Поиск пользователя по id",
        Description = "Возвращает найденного пользователя или исключение",
        OperationId = "GetUserById"
    )]
    [SwaggerResponse(200, "Пользователь найден успешно", typeof(User))]
    [SwaggerResponse(404, "Пользователь не найден")]
    [HttpGet("{id}")]
    public ActionResult GetUserById(int id)
    {
        return Ok(_repo.FindUserById(id));
    }

    [SwaggerOperation(
        Summary = "Удаление пользователя по id",
        Description = "Возвращает true или исключение",
        OperationId = "DeleteUser"
    )]
    [SwaggerResponse(200, "Пользователь удален успешно", typeof(User))]
    [SwaggerResponse(404, "Пользователь не найден")]
    [HttpDelete("{id}")]
    public ActionResult DeleteUser(int id)
    {
        return Ok(_repo.DeleteUser(id));
    }

    [SwaggerOperation(
        Summary = "Аутентификация пользователя по логину и паролю",
        Description = "Возвращает пользователя при успешной аутентификации",
        OperationId = "Login"
    )]
    [HttpPost("Login")]
    public ActionResult Login(UserDto userDto)
    {
        var user = _repo.FindUserByLogin(userDto.Login);
        return CheckPasswordHash(userDto, user);
    }

    private ActionResult CheckPasswordHash(UserDto userDto, User user)
    {
        using var hmac = new HMACSHA256(user.PasswordSalt);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDto.Password));

        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i])
            {
                return Unauthorized($"Неправильный пароль");
            }
        }

        return Ok(user);
    }
}
