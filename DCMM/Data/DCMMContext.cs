using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DCMM.Models;

namespace DCMM.Data
{
    public class DCMMContext : DbContext
    {
        public DCMMContext (DbContextOptions<DCMMContext> options)
            : base(options)
        {
        }

        public DbSet<DCMM.Models.User> User { get; set; } = default!;
    }
}
