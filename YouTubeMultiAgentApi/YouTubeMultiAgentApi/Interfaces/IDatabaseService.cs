namespace YouTubeMultiAgentApi
{
	public interface IDatabaseService
	{
		public Task<List<string>> GetFavourites(string userId);
		public Task<List<Note>> GetNotes(string videoId, string userId);
		public Task<User> GetUser();
		public Task AddFavourites(List<string> favourites, string userId);
		public Task RemoveFavourites(List<string> favourites, string userId);
		public Task AddNotes(List<string> notes, string videoId, string userId);
		public Task RemoveNotes(List<string> noteIds, string videoId, string userId);
	}
}
