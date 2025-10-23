using Microsoft.EntityFrameworkCore;
using System.Security;
using YouTubeMultiAgentApi.Controllers;

namespace YouTubeMultiAgentApi
{
	public class DatabaseService : IDatabaseService
	{
		private readonly YouTubeContext _context;
		public DatabaseService(YouTubeContext context)
		{
			_context = context;
		}
		public async Task<List<string>> GetFavourites(string userId)
		{
			return await _context.Favourites.Where(x => x.UserID == userId).Select(y => y.VideoID).ToListAsync();
		}

		public async Task<List<Note>> GetNotes(string videoId, string userId)
		{
			Favourite favourite = await GetFavourite(videoId, userId);
			return await _context.Notes.Where(x => x.FavouriteID == favourite.FavouriteID).ToListAsync();
		}

		public async Task<User> GetUser()
		{
			// Ideally would be getting this via an auth token but just getting only database entry for now
			return await _context.Users.FirstAsync();
		}

		public async Task AddFavourites(List<string> favourites, string userId)
		{
			List<Favourite> entitiesToAdd = favourites.Select(x => new Favourite { FavouriteID = Guid.NewGuid().ToString(), UserID = userId, VideoID = x }).ToList();
			_context.Favourites.AddRange(entitiesToAdd);
			await _context.SaveChangesAsync();
		}

		public async Task RemoveFavourites(List<string> favourites, string userId)
		{
			List<Favourite> favouritesToDelete = await _context.Favourites.Where(x => x.UserID == userId && favourites.Contains(x.VideoID)).ToListAsync();
			List<Note> notesToRemove = await _context.Notes.Where(x => favouritesToDelete.Select(y => y.FavouriteID).Contains(x.FavouriteID)).ToListAsync();
			_context.Notes.RemoveRange(notesToRemove);
			await _context.SaveChangesAsync();
			_context.Favourites.RemoveRange(favouritesToDelete);
			await _context.SaveChangesAsync();
		}

		public async Task AddNotes(List<string> notes, string videoId, string userId)
		{
			Favourite favourite = await GetFavourite(videoId, userId);
			List<Note> entitiesToAdd = notes.Select(x => new Note { NoteID = Guid.NewGuid().ToString(), FavouriteID = favourite.FavouriteID, NoteText = x }).ToList();
			_context.Notes.AddRange(entitiesToAdd);
			await _context.SaveChangesAsync();
		}

		public async Task RemoveNotes(List<string> noteIds, string videoId, string userId)
		{
			Favourite favourite = await GetFavourite(videoId, userId);
			List<Note> notesToDelete = await _context.Notes.Where(x => x.FavouriteID == favourite.FavouriteID && noteIds.Contains(x.NoteID)).ToListAsync();
			_context.Notes.RemoveRange(notesToDelete);
			await _context.SaveChangesAsync();
		}

		private async Task<Favourite> GetFavourite(string videoId, string userId)
		{
			Favourite favourite = await _context.Favourites.FirstOrDefaultAsync(x => x.VideoID == videoId);
			if (favourite == null || favourite.UserID != userId)
			{
				throw new NullReferenceException("Favourite video not found");
			}
			return favourite;
		}
	}
}
