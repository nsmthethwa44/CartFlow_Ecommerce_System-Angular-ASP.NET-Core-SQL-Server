using CartFlow.Entities;

namespace CartFlow.Interfaces
{
    // ------------------------------------
    // ICategoryRepository Interface
    // ------------------------------------
    public interface ICategoryRepository
    {
        Task<List<Category>> GetAllAsync();
        Task<Category?> GetByIdAsync(int id);
        Task AddAsync(Category category);
        Task UpdateAsync(Category category);
        Task DeleteAsync(Category category);
    }
}
