using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using urlShortedLinkService.Models;

namespace urlShortedLinkService.Data
{
    public class urlShortedLinkServiceContext : DbContext
    {
        public urlShortedLinkServiceContext (DbContextOptions<urlShortedLinkServiceContext> options)
            : base(options)
        {
        }

        public DbSet<urlShortedLinkService.Models.shortedMap> shortedMap { get; set; } = default!;
    }
}
