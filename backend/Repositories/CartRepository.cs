using CartFlow.Data;
using CartFlow.Entities;
using CartFlow.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CartFlow.Repositories
{
    // ------------------------------------
    // cart repository
    // ------------------------------------
    public class CartRepository : ICartRepository
    {
        private readonly AppDbContext _db;
        public CartRepository(AppDbContext db) => _db = db;

        // get user cart by user id
        public async Task<List<CartItem>> GetUserCartAsync(int userId) =>
            await _db.CartItems.Include(ci => ci.Product).Where(ci => ci.UserId == userId).ToListAsync();

        // filter items using user id & product id
        public async Task<CartItem?> GetCartItemAsync(int userId, int productId) =>
            await _db.CartItems.Include(ci => ci.Product).FirstOrDefaultAsync(ci => ci.UserId == userId && ci.ProductId == productId);


        // add product to a cart
        public async Task AddAsync(CartItem item) {
            _db.CartItems.Add(item); await _db.SaveChangesAsync();
        }

        // update cart
        public async Task UpdateAsync(CartItem item) { 
            _db.CartItems.Update(item); await _db.SaveChangesAsync(); 
        }

        // remove product from user cart
        public async Task RemoveAsync(CartItem item) { 
            _db.CartItems.Remove(item); await _db.SaveChangesAsync(); 
        }

        // clear or delete user cart
        public async Task ClearUserCartAsync(int userId)
        {
            var items = _db.CartItems.Where(ci => ci.UserId == userId);
            _db.CartItems.RemoveRange(items);
            await _db.SaveChangesAsync();
        }
    }
}
