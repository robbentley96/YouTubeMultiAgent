using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace YouTubeMultiAgentApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class YouTubeController : ControllerBase
	{
		private readonly ILogger<YouTubeController> _logger;
		private readonly IYouTubeService _youTubeService;

		public YouTubeController(ILogger<YouTubeController> logger, IYouTubeService youTubeService)
		{
			_logger = logger;
			_youTubeService = youTubeService;
		}

		[HttpGet("Search")]
		public async Task<IActionResult> Search([FromQuery] string query, [FromQuery] string duration)
		{
			var result = await _youTubeService.Search(query, duration);
			return new OkObjectResult(result);
		}

		[HttpPost("GetVideos")]
		public async Task<IActionResult> GetVideos([FromBody] GetVideosRequest req)
		{
			var result = await _youTubeService.GetVideos(req.VideoIds);
			return new OkObjectResult(result);
		}
	}
}
