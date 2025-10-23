namespace YouTubeMultiAgentApi
{
	public interface IYouTubeService
	{
		public Task<List<Video>> Search(string query, string videoLength);
		public Task<List<Video>> GetVideos(List<string> videoIds);
	}
}
