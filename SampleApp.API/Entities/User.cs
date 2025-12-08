using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SampleApp.API.Entities;

public class User : Base
{
    public string Name { get; set; } = string.Empty;
    public required string Login { get; set; }
    public required byte[] PasswordHash { get; set; }
    public required byte[] PasswordSalt { get; set; }
    public string Token { get; set; } = string.Empty;
    public string Avatar { get; set; } = string.Empty;

    // [JsonIgnore]
    public IEnumerable<Micropost>? Microposts { get; set; }
    public IEnumerable<Relation>? FollowedRelations { get; set; }
    public IEnumerable<Relation>? FollowerRelations { get; set; }
}
