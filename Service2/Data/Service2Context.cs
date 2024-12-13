using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Service2.Models;

namespace Service2.Data
{
    public class Service2Context : DbContext
    {
        public Service2Context (DbContextOptions<Service2Context> options)
            : base(options)
        {
        }

        public DbSet<Service2.Models.User> User { get; set; } = default!;
    }
}
