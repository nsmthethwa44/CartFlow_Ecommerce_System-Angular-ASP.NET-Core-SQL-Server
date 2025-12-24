using CartFlow.Entities;

namespace CartFlow.Interfaces
{
    // ------------------------------------
    // IProductRepository interface
    // ------------------------------------
    public interface IProductRepository
    {
        Task<List<Product>> GetAllAsync();
        Task<Product?> GetByIdAsync(int id);
        Task AddAsync(Product product);
        Task UpdateAsync(Product product);
        Task DeleteAsync(Product product);
        Task<List<Product>> GetPagedAsync(int categoryId);

    }
}
