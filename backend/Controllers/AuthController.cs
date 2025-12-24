using CartFlow.DTOs;
using CartFlow.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CartFlow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _service;
        public AuthController(IAuthService service) => _service = service;

        // use try-catch to prevent app from crushing, return clear status code & error message
        // registering a new user
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromForm] RegisterDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                var user = await _service.RegisterAsync(dto);
                return Ok(new { msg = "User registered successfully", data = user });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "An error occurred while registering new user", details = ex.Message });
            }
        }

        // login user,
        // return status code when errors occurs &
        // detailed error message
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var result = await _service.LoginAsync(dto);
                if (result == null)
                    return Unauthorized(new { message = "Invalid email or password." });
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while logging in", details = ex.Message });
            }
        }

    }
}
