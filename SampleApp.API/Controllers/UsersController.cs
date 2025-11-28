using Microsoft.AspNetCore.Mvc;
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

    public UsersController(IUserRepository repo)
    {
        _repo = repo;
    }

    [SwaggerOperation(
        Summary = "Создание пользователя",
        Description = "Возвращает нового пользователя",
        OperationId = "CreateUser"
    )]
    [SwaggerResponse(200, "Пользователь создан успешно", typeof(User))]
    [HttpPost]
    public ActionResult CreateUser(User user)
    {
        var validator = new UserValidator();
        var result = validator.Validate(user);

        if (!result.IsValid)
        {
            throw new Exception($"{result.Errors.First().ErrorMessage}");
        }
        return Ok(_repo.CreateUser(user));
    }

    [SwaggerOperation(
        Summary = "Получение списка пользователей",
        Description = "Возвращает все пользователей",
        OperationId = "GetProducts"
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
}
