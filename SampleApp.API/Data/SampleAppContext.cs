using Microsoft.EntityFrameworkCore;
using SampleApp.API.Entities;

namespace SampleApp.API.Data;

public class SampleAppContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Micropost> Microposts { get; set; }
    public DbSet<Relation> Relations { get; set; }

    public SampleAppContext(DbContextOptions<SampleAppContext> opt)
        : base(opt) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Настройка для всех сущностей, унаследованных от Base
        foreach (var entityType in modelBuilder.Model.GetEntityTypes()
            .Where(e => typeof(Base).IsAssignableFrom(e.ClrType)))
        {
            var entity = modelBuilder.Entity(entityType.ClrType);

            // CreatedAt - значение при вставке
            entity.Property(nameof(Base.CreatedAt))
                .HasDefaultValueSql("NOW()") // или "CURRENT_TIMESTAMP"
                .ValueGeneratedOnAdd();

            // UpdatedAt - значение при вставке и обновлении
            entity.Property(nameof(Base.UpdatedAt))
                .HasDefaultValueSql("NOW()")
                .ValueGeneratedOnAddOrUpdate();
        }

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Login).IsUnique();

            entity.Property(e => e.Login).IsRequired().HasMaxLength(50);

            entity.Property(e => e.Name).HasMaxLength(100);

            entity.Property(e => e.PasswordHash).IsRequired();

            entity.Property(e => e.PasswordSalt).IsRequired();

            // entity.HasMany(e => e.Microposts);
            // entity.HasMany(e => e.FollowedRelations);
            // entity.HasMany(e => e.FollowerRelations);
        });

        // Конфигурация для Micropost
        modelBuilder.Entity<Micropost>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Content).IsRequired().HasMaxLength(280);

            entity
                .HasOne(e => e.User)
                .WithMany(u => u.Microposts)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasIndex(e => e.UserId);
            entity.HasIndex(e => e.CreatedAt);
        });

        modelBuilder.Entity<Relation>(entity =>
        {
            entity.HasKey(e => e.Id);

            // Внешний ключ для Followed (пользователь, на которого подписываются)
            entity
                .HasOne(e => e.Followed)
                .WithMany(u => u.FollowedRelations)
                .HasForeignKey(e => e.FollowedId)
                .OnDelete(DeleteBehavior.Restrict);

            // Внешний ключ для Follower (пользователь, который подписывается)
            entity
                .HasOne(e => e.Follower)
                .WithMany(u => u.FollowerRelations)
                .HasForeignKey(e => e.FollowerId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasIndex(e => new { e.FollowerId, e.FollowedId }).IsUnique();

            //Check constraint
            entity.ToTable(t =>
                t.HasCheckConstraint("CK_Relation_SelfFollow", "\"FollowedId\" != \"FollowerId\"")
            );

            // entity.HasCheckConstraint("CK_Relation_SelfFollow", "FollowedId != FollowerId");

            entity.HasIndex(e => e.FollowerId);
            entity.HasIndex(e => e.FollowedId);
        });
    }
}
