using CartFlow.DTOs;
using CartFlow.Entities;

namespace CartFlow.Interfaces
{
    // ------------------------------------
    // order service interface
    // ------------------------------------
    public interface IOrderService
    {
        Task<ResponseOrderDto> PlaceOrderAsync(CreateOrderDto dto, int userId);
        Task<IEnumerable<ResponseOrderDto>> GetUserOrdersAsync(int userId);
        Task<IEnumerable<ResponseOrderDto>> GetAllOrdersAsync();
        Task<bool> UpdateStatusAsync(int orderId, string status);
    }
}
