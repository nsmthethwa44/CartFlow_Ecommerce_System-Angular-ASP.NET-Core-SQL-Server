using CartFlow.DTOs;
using CartFlow.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CartFlow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // get all users, retun a try-catch error when error happens 
        // or failes to get users
        [HttpGet]
        //[Authorize(Roles ="Adim")]
        public async Task<ActionResult<IEnumerable<ResponseUserDto>>> GetAllUsers()
        {
            try
            {
                var users = await _userService.GetAllUsersAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error occured while getting users", details = ex.Message });
            }
        }
    }
}
