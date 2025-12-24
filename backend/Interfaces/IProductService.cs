using CartFlow.DTOs;
using CartFlow.Entities;

namespace CartFlow.Services
{
    // ------------------------------------
    // product service interace
    // ------------------------------------
    public interface IProductService
    {
        Task<IEnumerable<ResponseProductDto>> GetAllAsync();
        Task<ResponseProductDto?> GetByIdAsync(int id);
        Task<ResponseProductDto> CreateAsync(CreateProductDto dto);
        Task<ResponseProductDto?> UpdateAsync(int id, UpdateProductDto dto);
        Task<bool> DeleteAsync(int id);
        Task<List<ResponseProductDto>> GetByCategoryAsync(int categoryId);
    }
}
