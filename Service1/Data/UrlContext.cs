using System.Data.Common;
using Microsoft.EntityFrameworkCore;
using Service1.Models;

namespace Service1.Data
{
    public class UrlContext : DbContext
    {
        public UrlContext(DbContextOptions<UrlContext> options) 
            : base(options) 
        { 
            
        }

        public DbSet<Service1.Models.Url> Urls { get; set; } = default!;
    }
}
