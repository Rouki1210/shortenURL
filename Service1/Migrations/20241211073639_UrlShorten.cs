using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Service1.Migrations
{
    /// <inheritdoc />
    public partial class UrlShorten : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Urls",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    currentUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    shorturl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NumofClicks = table.Column<int>(type: "int", nullable: false),
                    DateCreate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Urls", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Urls");
        }
    }
}
