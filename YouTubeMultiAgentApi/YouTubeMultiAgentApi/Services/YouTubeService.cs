using Azure;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Options;
using System.Runtime;
using System.Text.Json;

namespace YouTubeMultiAgentApi
{
	public class YouTubeService : IYouTubeService
	{
		private readonly HttpClient _httpClient;
		private static string[] _durations = ["short", "medium", "long"];
		private readonly YouTubeSettings _settings;
		public YouTubeService(IHttpClientFactory http, IOptions<YouTubeSettings> settings)
		{
			_httpClient = http.CreateClient("YouTube");
			_settings = settings.Value;
		}
		public async Task<List<Video>> Search(string query, string duration)
		{
			var parameters = new Dictionary<string, string?>
			{
				{ "type", "video" },
				{ "maxResult", "5" },
				{ "key", _settings.YouTubeApiKey },
				{ "q", query }
			};

			if (_durations.Contains(duration))
			{
				parameters["videoDuration"] = duration;
			}
			var endpoint = QueryHelpers.AddQueryString("search", parameters);

			var result = await _httpClient.GetAsync(endpoint);

			var json = await result.Content.ReadAsStringAsync();
			var youTubeSearchResult = JsonSerializer.Deserialize<YouTubeSearchResult>(json, new JsonSerializerOptions
			{
				PropertyNameCaseInsensitive = true
			});

			List<string> ids = youTubeSearchResult.Items.Select(x => x.Id.VideoId).ToList();

			return await GetVideos(ids);
		}

		public async Task<List<Video>> GetVideos(List<string> videoIds)
		{
			var parameters = new Dictionary<string, string?>
			{
				{ "type", "video" },
				{ "part", "snippet,contentDetails" },
				{ "key", _settings.YouTubeApiKey },
				{ "id", string.Join(",", videoIds) }
			};
			var endpoint = QueryHelpers.AddQueryString("videos", parameters);

			var result = await _httpClient.GetAsync(endpoint);

			var json = await result.Content.ReadAsStringAsync();
			var youTubeSearchResult = JsonSerializer.Deserialize<YouTubeVideoResult>(json, new JsonSerializerOptions
			{
				PropertyNameCaseInsensitive = true
			});

			return youTubeSearchResult.Items.Select(x => ConvertItemToVideo(x)).ToList();
		}
		private Video ConvertItemToVideo(YouTubeVideoItem item)
		{
			return new Video()
			{
				Name = item.Snippet.Title,
				Description = item.Snippet.Description.Length >= 100 ? item.Snippet.Description.Substring(0, 100) : item.Snippet.Description,
				Id = item.Id,
				ThumbnailUrl = item.Snippet.Thumbnails.Medium.Url,
				Duration = item.ContentDetails.Duration,
				PublishDate = DateTime.Parse(item.Snippet.PublishedAt).ToString("yyyy-MM-dd")
			};
		}
	}
}
