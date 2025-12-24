using CartFlow.Data;
using CartFlow.Entities;
using CartFlow.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CartFlow.Repositories
{
    // ------------------------------------
    // category repository
    // ------------------------------------
    public class CategoryRepository : ICategoryRepository
    {
        private readonly AppDbContext _db;
        public CategoryRepository(AppDbContext db) => _db = db;

        // get all categories
        public async Task<List<Category>> GetAllAsync() => 
            await _db.Categories.ToListAsync();

        // get category by id
        public async Task<Category?> GetByIdAsync(int id) =>
            await _db.Categories.FindAsync(id);

        // add new category
        public async Task AddAsync(Category category) {
            _db.Categories.Add(category); await _db.SaveChangesAsync();
        }

        // update category
        public async Task UpdateAsync(Category category) {
            _db.Categories.Update(category); await _db.SaveChangesAsync();
        }

        // delete category
        public async Task DeleteAsync(Category category) {
            _db.Categories.Remove(category); await _db.SaveChangesAsync();
        }
    }
}
