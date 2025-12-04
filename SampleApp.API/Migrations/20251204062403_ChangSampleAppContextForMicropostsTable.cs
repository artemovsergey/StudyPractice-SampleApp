using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SampleApp.API.Migrations
{
    /// <inheritdoc />
    public partial class ChangSampleAppContextForMicropostsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Micropost_Users_UserId",
                table: "Micropost");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Micropost",
                table: "Micropost");

            migrationBuilder.RenameTable(
                name: "Micropost",
                newName: "Microposts");

            migrationBuilder.RenameIndex(
                name: "IX_Micropost_UserId",
                table: "Microposts",
                newName: "IX_Microposts_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Microposts",
                table: "Microposts",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Microposts_Users_UserId",
                table: "Microposts",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Microposts_Users_UserId",
                table: "Microposts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Microposts",
                table: "Microposts");

            migrationBuilder.RenameTable(
                name: "Microposts",
                newName: "Micropost");

            migrationBuilder.RenameIndex(
                name: "IX_Microposts_UserId",
                table: "Micropost",
                newName: "IX_Micropost_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Micropost",
                table: "Micropost",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Micropost_Users_UserId",
                table: "Micropost",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
