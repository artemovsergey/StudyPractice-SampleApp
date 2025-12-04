using Microsoft.EntityFrameworkCore;
using SampleApp.API.Entities;

namespace SampleApp.API.Data;

public class SampleAppContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Micropost> Microposts { get; set; }

    public SampleAppContext(DbContextOptions<SampleAppContext> opt)
        : base(opt) { }
}
