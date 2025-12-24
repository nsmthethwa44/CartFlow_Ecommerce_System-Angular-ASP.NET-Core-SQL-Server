using CartFlow.Data;
using CartFlow.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CartFlow.Repositories
{
    public class StatsRepository : IStatsRepository
    {
        private readonly AppDbContext _db;

        public StatsRepository(AppDbContext db)
        {
            _db = db;
        }

        public async Task<int> CountUsersAsync()
        {
            return await _db.Users.CountAsync();
        }

        public async Task<int> CountProductsAsync()
        {
            return await _db.Products.CountAsync();
        }

        public async Task<int> CountOrdersAsync()
        {
            return await _db.Orders.CountAsync();
        }

        public async Task<int> CountCategoriesAsync()
        {
            return await _db.Categories.CountAsync();
        }
    }

}
