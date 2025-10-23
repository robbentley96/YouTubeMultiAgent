using Microsoft.EntityFrameworkCore;

namespace YouTubeMultiAgentApi
{
	public class YouTubeContext : DbContext
	{
		public YouTubeContext(DbContextOptions options) : base(options)
		{
		}

		public DbSet<User> Users { get; set; }
		public DbSet<Favourite> Favourites { get; set; }
		public DbSet<Note> Notes { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
		}
	}
}
