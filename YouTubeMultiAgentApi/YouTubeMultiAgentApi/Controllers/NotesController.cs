using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace YouTubeMultiAgentApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class NotesController : ControllerBase
	{
		private readonly ILogger<NotesController> _logger;
		private readonly IDatabaseService _databaseService;
		private readonly User _user;

		public NotesController(ILogger<NotesController> logger, IDatabaseService databaseService)
		{
			_logger = logger;
			_databaseService = databaseService;
			_user = _databaseService.GetUser().Result;
		}

		[HttpGet("GetNotes")]
		public async Task<IActionResult> GetNotes([FromQuery] string videoId)
		{
			var result = await _databaseService.GetNotes(videoId, _user.UserID);
			return new OkObjectResult(result);
		}

		[HttpPost("AddNotes")]
		public async Task<IActionResult> AddNotes([FromBody] AddNotesRequest req)
		{
			await _databaseService.AddNotes(req.Notes, req.VideoId, _user.UserID);
			return new OkResult();
		}

		[HttpDelete("RemoveNotes")]
		public async Task<IActionResult> RemoveNotes([FromBody] RemoveNotesRequest req)
		{
			await _databaseService.RemoveNotes(req.NoteIds, req.VideoId, _user.UserID);
			return new OkResult();
		}
	}
}
