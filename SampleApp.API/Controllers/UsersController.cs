using System.Security.Cryptography;
using System.Text;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SampleApp.API.Dtos;
using SampleApp.API.Entities;
using SampleApp.API.Interfaces;
using SampleApp.API.Models;
using SampleApp.API.Validations;
using Swashbuckle.AspNetCore.Annotations;

namespace SampleApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IMicropostRepository _postRepo;
    private readonly IUserRepository _repo;
    private readonly ITokenService _ts;
    private HMACSHA256 hmac = new HMACSHA256();

    public UsersController(IMicropostRepository postRepo, IUserRepository repo, ITokenService ts)
    {
        _postRepo = postRepo;
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
    public ActionResult CreateUser(LoginDto userDto)
    {
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

    [SwaggerOperation(
        Summary = "Получение списка пользователей c параметрами",
        Description = "Возвращает объект ApiResult<User>: список пользователей с параметрами",
        OperationId = "GetUsersByParams"
    )]
    [SwaggerResponse(200, "Список пользователей получен успешно", typeof(ApiResult<User>))]
    [HttpGet("option")]
    public ActionResult<ApiResult<User>> GetUsersByParams([FromQuery] Option opt)
    {
        return Ok(
            new ApiResult<User>()
            {
                PageNumber = opt.PageNumber,
                PageSize = opt.PageSize,
                Data = _repo.GetUsers(opt),
                Count = _repo.GetUsers().Count,
            }
        );
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
    [SwaggerResponse(200, "Пользователь обновлен успешно", typeof(EditUserDto))]
    [SwaggerResponse(500, "Пользователь не найден")]
    [HttpPut]
    public ActionResult<User> UpdateUser(EditUserDto editUserDto)
    {
        var currentUser = _repo.FindUserById(editUserDto.Id);

        currentUser.Name = editUserDto.Name;
        currentUser.Login = editUserDto.Login;

        return Ok(_repo.EditUser(currentUser, currentUser.Id));
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
    public ActionResult Login(LoginDto userDto)
    {
        var user = _repo.FindUserByLogin(userDto.Login);
        return CheckPasswordHash(userDto, user);
    }

    [SwaggerOperation(
        Summary = "Найти все сообщения пользователя по id",
        Description = "Возвращает список сообщений List<Microposts>",
        OperationId = "GetMicropostByUser"
    )]
    [HttpGet("{userId}/microposts")]
    public ActionResult<List<MicropostDto>> GetMicropostByUser(int userId)
    {
        return _postRepo
            .GetMicropostsByUser(userId)
            .Select(m => new MicropostDto()
            {
                Id = m.Id,
                Content = m.Content,
                AttachImage = m.AttachImage!,
                User = new UserDto()
                {
                    Id = m.User!.Id,
                    Avatar = m.User!.Avatar,
                    Login = m.User.Login,
                    Name = m.User.Name,
                },
            })
            .ToList<MicropostDto>();
    }

    private ActionResult CheckPasswordHash(LoginDto userDto, User user)
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
