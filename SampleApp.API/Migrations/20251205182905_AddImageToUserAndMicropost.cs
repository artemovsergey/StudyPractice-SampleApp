using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SampleApp.API.Migrations
{
    /// <inheritdoc />
    public partial class AddImageToUserAndMicropost : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Avatar",
                table: "Users",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AttachImage",
                table: "Microposts",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Avatar",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "AttachImage",
                table: "Microposts");
        }
    }
}
