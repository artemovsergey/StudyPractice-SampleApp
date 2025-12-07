using Microsoft.AspNetCore.Mvc;
using SampleApp.API.Dtos;
using SampleApp.API.Entities;
using SampleApp.API.Interfaces;
using SampleApp.API.Models;
using SampleApp.API.Response;
using Swashbuckle.AspNetCore.Annotations;

namespace SampleApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MicropostsController(IMicropostRepository repo) : ControllerBase
{
    [SwaggerOperation(
        Summary = "Получение списка сообщений c параметрами",
        Description = "Возвращает объект ApiResult<Micropost>: список сообщений с параметрами",
        OperationId = "GetMicropostsByParams"
    )]
    [SwaggerResponse(200, "Список пользователей получен успешно", typeof(ApiResult<Micropost>))]
    [HttpGet("option")]
    public ActionResult<ApiResult<Micropost>> GetMicropostsByParams([FromQuery] Option opt)
    {
        return Ok(
            new ApiResult<Micropost>()
            {
                PageNumber = opt.PageNumber,
                PageSize = opt.PageSize,
                Data = repo.GetMicroposts(opt),
                Count = repo.GetMicroposts().Count,
            }
        );
    }

    [SwaggerOperation(
        Summary = "Получение списка сообщений",
        Description = "Возвращает все сообщения",
        OperationId = "GetMicroposts"
    )]
    [SwaggerResponse(200, "Список пользователей получен успешно", typeof(List<Micropost>))]
    [HttpGet]
    public ActionResult<List<Micropost>> GetMicroposts()
    {
        return Ok(repo.GetMicroposts());
    }

    [SwaggerOperation(
        Summary = "Создание сообщения",
        Description = "Возвращает сообщение",
        OperationId = "CreateMicroposts"
    )]
    [SwaggerResponse(201, "Сообщение успешно создано", typeof(Micropost))]
    [HttpPost]
    public ActionResult<List<Micropost>> CreateMicroposts(MicropostCreateDto postDto)
    {
        var post = new Micropost() { Content = postDto.Content, UserId = postDto.UserId };
        return Created("", repo.CreateMicropost(post));
    }

    [SwaggerOperation(
        Summary = "Поиск сообщения по id",
        Description = "Возвращает объект сообщения Micropost",
        OperationId = "GetMicropost"
    )]
    [SwaggerResponse(200, "Сообщение успешно найдено", typeof(Micropost))]
    [SwaggerResponse(404, "Сообщение не найдено", typeof(ErrorResponse))]
    [HttpGet("{id}")]
    public ActionResult<Micropost> GetMicropost(int id)
    {
        var post = repo.FindMicropostById(id);
        return Ok(post);
    }

    [SwaggerOperation(
        Summary = "Обновление сообщения по id и body",
        Description = "Возвращает объект Micropost",
        OperationId = "UpdateMicropost"
    )]
    [SwaggerResponse(200, "Сообщение успешно обновлено", typeof(Micropost))]
    [SwaggerResponse(404, "Сообщение не найдено", typeof(ErrorResponse))]
    [HttpPut("{id}")]
    public ActionResult<Micropost> UpdateMicropost(EditMicropostDto editMicropostDto, int id)
    {
        var micropost = new Micropost() { Id = id, Content = editMicropostDto.Content };
        return Ok(repo.EditMicropost(micropost, id));
    }

    [SwaggerOperation(
        Summary = "Удаление сообщения по id",
        Description = "Возвращает объект Micropost",
        OperationId = "DeleteMicropost"
    )]
    [SwaggerResponse(200, "Сообщение успешно удалено", typeof(Micropost))]
    [SwaggerResponse(404, "Сообщение не найдено", typeof(ErrorResponse))]
    [HttpDelete("{id}")]
    public ActionResult<Micropost> DeleteMicropost(int id)
    {
        return Ok(repo.DeleteMicropost(id));
    }
}
