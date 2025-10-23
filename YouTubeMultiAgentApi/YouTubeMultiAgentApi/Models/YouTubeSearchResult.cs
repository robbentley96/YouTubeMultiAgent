namespace YouTubeMultiAgentApi
{
	public class YouTubeSearchResult
	{
		public List<Item> Items { get; set; }
	}

	public class YouTubeVideoResult
	{
		public List<YouTubeVideoItem> Items { get; set; }
	}
	public class YouTubeVideoItem
	{
		public string Id { get; set; }
		public Snippet Snippet { get; set; }
		public ContentDetails ContentDetails { get; set; }
	}

	public class Item
	{
		public Id Id { get; set; }
		public Snippet Snippet { get; set; }
	}

	public class Snippet
	{
		public string Title { get; set; }
		public string Description { get; set; }
		public string ChannelTitle { get; set; }
		public string PublishedAt { get; set; }
		public Thumbnails Thumbnails { get; set; }
	}

	public class ContentDetails
	{
		public string Duration { get; set; }
	}

	public class Id
	{
		public string VideoId { get; set; }
	}

	public class Thumbnails
	{
		public Thumbnail Default { get; set; }
		public Thumbnail Medium { get; set; }
		public Thumbnail High { get; set; }
	}

	public class Thumbnail
	{
		public string Url { get; set; }
	}
}
