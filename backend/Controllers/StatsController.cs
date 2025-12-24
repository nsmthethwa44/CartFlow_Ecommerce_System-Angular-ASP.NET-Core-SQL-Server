using CartFlow.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CartFlow.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatsController : ControllerBase
    {
        private readonly IStatsService _service;

        public StatsController(IStatsService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCounts()
        {
            var stats = await _service.GetStatsAsync();
            return Ok(stats);
        }
    }
}
