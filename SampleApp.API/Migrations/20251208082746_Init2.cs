using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SampleApp.API.Migrations
{
    /// <inheritdoc />
    public partial class Init2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddCheckConstraint(
                name: "CK_Relation_SelfFollow",
                table: "Relations",
                sql: "\"FollowedId\" != \"FollowerId\"");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_Relation_SelfFollow",
                table: "Relations");
        }
    }
}
