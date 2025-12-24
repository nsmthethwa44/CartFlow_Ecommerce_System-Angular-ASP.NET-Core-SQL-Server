using CartFlow.DTOs;
using CartFlow.Entities;

namespace CartFlow.Services
{
    // ------------------------------------
    // cart service interface
    // ------------------------------------
    public interface ICartService
    {
        Task<IEnumerable<CartItemDto>> GetCartByUserIdAsync(int userId);
        Task AddToCartAsync(int userId, AddToCartDto dto);
        Task UpdateQuantityAsync(int userId, int productId, int quantity);
        Task RemoveFromCartAsync(int userId, int productId);
        Task ClearCartAsync(int userId);
        Task MergeCartAsync(int userId, List<AddToCartDto> items);
    }
}
