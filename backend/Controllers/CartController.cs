using CartFlow.DTOs;
using CartFlow.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CartFlow.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        // Helper extract userId from JWT
        // a loged-in user id
        private int GetUserId()
        {
            return int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        }

        private readonly ICartService _service;
        public CartController(ICartService service)
        {
            _service = service;
        }

        [HttpGet()]
        public async Task<IActionResult> GetCart()
        {
            var userId = GetUserId();
            var items = await _service.GetCartByUserIdAsync(userId);
            return Ok(items);
        }

        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody] AddToCartDto dto)
        {
            var userId = GetUserId();
            await _service.AddToCartAsync(userId, dto);
            return Ok();
        }


        [HttpDelete("{productId}")]
        public async Task<IActionResult> Remove(int productId)
        {
            var userId = GetUserId();
            await _service.RemoveFromCartAsync(userId, productId);
            return Ok();
        }


        [HttpPost("clear/{userId}")]
        public async Task<IActionResult> Clear()
        {
            var userId = GetUserId();
            await _service.ClearCartAsync(userId);
            return NoContent();
        }

        [HttpPost("merge")]
        public async Task<IActionResult> Merge([FromBody] List<AddToCartDto> dto)
        {
            var userId = GetUserId();
            await _service.MergeCartAsync(userId, dto);
            return Ok();
        }

    }

}
