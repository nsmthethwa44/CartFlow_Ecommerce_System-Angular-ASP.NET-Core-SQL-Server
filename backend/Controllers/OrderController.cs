using CartFlow.DTOs;
using CartFlow.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CartFlow.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        // Helper extract userId from JWT
        // a loged-in user id
        private int GetUserId()
        {
            return int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        }

        private readonly IOrderService _service;
        public OrderController(IOrderService service)
        {
            _service = service;
        }

        // get user or customer orders
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserOrders(int userId)
        {
            var items = await _service.GetUserOrdersAsync(userId);
            return Ok(items);
        }

        //get all orders for admin
        [HttpGet]
        public async Task<IActionResult> GetAllOrders()
        {
            var results = await _service.GetAllOrdersAsync();
            return Ok(results);
        }

        // place order
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateOrderDto dto)
        {
            var userId = GetUserId();
            var order = await _service.PlaceOrderAsync(dto, userId);
            return Ok(order);
        }


        //[HttpGet("{id}")]
        //public async Task<IActionResult> GetById(int id)
        //{
        //    var order = await _service.GetOrderByIdAsync(id);
        //    if (order == null)
        //        return NotFound();

        //    return Ok(order);
        //}

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] string status)
        {
            var updated = await _service.UpdateStatusAsync(id, status);
            if (!updated)
                return NotFound();

            return Ok();
        }
    }

}
