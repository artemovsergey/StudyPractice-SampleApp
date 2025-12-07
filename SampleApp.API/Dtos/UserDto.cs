using System.Text.Json.Serialization;

namespace SampleApp.API.Entities;

public class UserDto : Base
{
    public string Name { get; set; } = string.Empty;
    public required string Login { get; set; }
    public string Avatar { get; set; } = string.Empty;
    public string Token { get; set; } = string.Empty;
}
