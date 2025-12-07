using SampleApp.API.Entities;

namespace SampleApp.API.Dtos;

public class MicropostDto : Base
{
    public string Content { get; set; } = string.Empty;
    public string AttachImage { get; set; } = string.Empty;
    public required UserDto User { get; set; }
};
