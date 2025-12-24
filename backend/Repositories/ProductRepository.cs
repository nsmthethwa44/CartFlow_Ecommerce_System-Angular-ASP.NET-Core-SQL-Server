using CartFlow.Data;
using CartFlow.Entities;
using CartFlow.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CartFlow.Repositories
{
    // ------------------------------------
    // product repository
    // ------------------------------------
    public class ProductRepository : IProductRepository
        {
            private readonly AppDbContext _db;
            public ProductRepository(AppDbContext db) => _db = db;

        // get all products repo
        public async Task<List<Product>> GetAllAsync() =>
            await _db.Products.Include(p => p.Category).ToListAsync();

        // get a product by id
        public async Task<Product?> GetByIdAsync(int id) =>
                    await _db.Products.Include(p => p.Category).FirstOrDefaultAsync(p => p.Id == id);

        // add new products
        public async Task AddAsync(Product product)
            {
                _db.Products.Add(product);
                await _db.SaveChangesAsync();
            }

        // update product using a sing item id
        public async Task UpdateAsync(Product product)
            {
                _db.Products.Update(product);
                await _db.SaveChangesAsync();
            }

        // delete products
        public async Task DeleteAsync(Product product)
            {
                _db.Products.Remove(product);
                await _db.SaveChangesAsync();
            }

        public async Task<List<Product>> GetPagedAsync(int categoryId)
        {
            return await _db.Products
                .Where(p => p.CategoryId == categoryId)
                .Include(p => p.Category)
                .OrderBy(p => p.Name)
                .ToListAsync();
        }
    }
}
