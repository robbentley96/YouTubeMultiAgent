using Microsoft.AspNetCore.Mvc;

namespace YouTubeMultiAgentApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FavouritesController : ControllerBase
    {
        private readonly ILogger<FavouritesController> _logger;
        private readonly IDatabaseService _databaseService;
        private readonly User _user;

        public FavouritesController(ILogger<FavouritesController> logger, IDatabaseService databaseService)
        {
            _logger = logger;
            _databaseService = databaseService;
            _user = _databaseService.GetUser().Result;
        }

        [HttpGet("GetFavourites")]
        public async Task<IActionResult> GetFavourites()
        {
            var result = await _databaseService.GetFavourites(_user.UserID);
            return new OkObjectResult(result);
		}

		[HttpPost("AddFavourites")]
		public async Task<IActionResult> AddFavourites([FromBody] AddFavouritesRequest req)
		{
            await _databaseService.AddFavourites(req.VideoIds, _user.UserID);
            return new OkResult();
		}

		[HttpDelete("RemoveFavourites")]
		public async Task<IActionResult> RemoveFavourites([FromBody] RemoveFavouritesRequest req)
		{
			await _databaseService.RemoveFavourites(req.VideoIds, _user.UserID);
			return new OkResult();
		}
	}
}
