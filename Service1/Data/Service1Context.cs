using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Service1.Models;

namespace Service1.Data
{
    public class Service1Context : DbContext
    {
        public Service1Context (DbContextOptions<Service1Context> options)
            : base(options)
        {
        }

        public DbSet<Service1.Models.Url> Url { get; set; } = default!;
    }
}
