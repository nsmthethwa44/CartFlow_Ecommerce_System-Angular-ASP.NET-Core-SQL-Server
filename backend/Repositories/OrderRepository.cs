using CartFlow.Data;
using CartFlow.Entities;
using CartFlow.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CartFlow.Repositories
{
    // ------------------------------------
    // order repository
    // ------------------------------------
    public class OrderRepository : IOrderRepository
    {
        private readonly AppDbContext _db;
        public OrderRepository(AppDbContext db) => _db = db;

        // get orders by id
        public async Task<Order?> GetByIdAsync(int id) =>
            await _db.Orders.Include(o => o.Items).FirstOrDefaultAsync(o => o.Id == id);

        // get user orders by user id
        public async Task<List<Order>> GetUserOrdersAsync(int userId) =>
            await _db.Orders.Include(o => o.Items).Where(o => o.UserId == userId).ToListAsync();

        // get all orders
        public async Task<List<Order>> GetAllAsync()
        {
            return await _db.Orders
                .Include(o => o.User)
                .Include(o => o.Items)
                    .ThenInclude(i => i.Product)
                    .OrderByDescending(o => o.Id)
                .ToListAsync();
        }

        // add new order & save
        public async Task AddAsync(Order order) { _db.Orders.Add(order); await _db.SaveChangesAsync(); }

        // update order details
        public async Task UpdateAsync(Order order) { 
            _db.Orders.Update(order); await _db.SaveChangesAsync(); 
        }
    }
}
