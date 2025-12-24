using CartFlow.Entities;

namespace CartFlow.Interfaces
{
    // ------------------------------------
    // IOrderRepository interface
    // ------------------------------------
    public interface IOrderRepository
    {
        Task<Order?> GetByIdAsync(int id);
        Task<List<Order>> GetUserOrdersAsync(int userId);
        Task<List<Order>> GetAllAsync();
        Task AddAsync(Order order);
        Task UpdateAsync(Order order);
    }
}
