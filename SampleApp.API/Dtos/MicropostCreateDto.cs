using SampleApp.API.Entities;

namespace SampleApp.API.Dtos;

public record MicropostCreateDto(string Content, int UserId);
