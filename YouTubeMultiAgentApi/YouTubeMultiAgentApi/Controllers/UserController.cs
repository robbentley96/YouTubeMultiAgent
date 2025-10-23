using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace YouTubeMultiAgentApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly ILogger<UserController> _logger;
		private readonly IDatabaseService _databaseService;

		public UserController(ILogger<UserController> logger, IDatabaseService databaseService)
		{
			_logger = logger;
			_databaseService = databaseService;
		}

		[HttpGet(Name = "GetUser")]
		public async Task<IActionResult> GetUser()
		{
			var user = await _databaseService.GetUser();
			return new OkObjectResult(user);
		}
	}
}
