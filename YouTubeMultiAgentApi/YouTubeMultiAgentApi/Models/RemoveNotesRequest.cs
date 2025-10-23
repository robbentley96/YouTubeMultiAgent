namespace YouTubeMultiAgentApi
{
	public class RemoveNotesRequest
	{
		public string VideoId { get; set; }
		public List<string> NoteIds { get; set; }
	}
}
