using Microsoft.EntityFrameworkCore;
using BoatApi.Models;

namespace BoatApi.Data
{
    public class BoatContext : DbContext
    {
        public BoatContext(DbContextOptions<BoatContext> options) : base(options) { }

        public DbSet<Boat> Boats { get; set; }
    }
}
