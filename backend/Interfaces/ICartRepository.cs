using CartFlow.Entities;

namespace CartFlow.Interfaces
{
    // ------------------------------------
    // ICartRepository Interface
    // ------------------------------------
    public interface ICartRepository
    {
        Task<List<CartItem>> GetUserCartAsync(int userId);
        Task<CartItem?> GetCartItemAsync(int userId, int productId);
        Task AddAsync(CartItem item);
        Task UpdateAsync(CartItem item);
        Task RemoveAsync(CartItem item);
        Task ClearUserCartAsync(int userId);
    }
}
