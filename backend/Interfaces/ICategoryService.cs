using CartFlow.DTOs;
using CartFlow.Entities;

namespace CartFlow.Interfaces
{
    // ------------------------------------
    // category service interface
    // ------------------------------------
    public interface ICategoryService
    {
        Task<IEnumerable<ResponseCategoryDto>> GetAllAsync();
        Task<ResponseCategoryDto?> GetByIdAsync(int id);
        Task<ResponseCategoryDto> CreateAsync(CreateCategoryDto dto);
        Task<bool> UpdateAsync(int id, UpdateCategoryDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
