using CartFlow.DTOs;
using CartFlow.Entities;
using CartFlow.Interfaces;

namespace CartFlow.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _repo;
        public CategoryService(ICategoryRepository repo)
        {
            _repo = repo;
        }

        // get all categories
        public async Task<IEnumerable<ResponseCategoryDto>> GetAllAsync()
        {
            var cats = await _repo.GetAllAsync();
            return cats.Select(c => new ResponseCategoryDto
            {
                Id = c.Id,
                Name = c.Name,
                ImageUrl = c.ImageUrl ?? string.Empty
            }).ToList();
        }

        // get category by id
        public async Task<ResponseCategoryDto?> GetByIdAsync(int id)
        {
            var c = await _repo.GetByIdAsync(id);
            if (c == null) return null;
            return new ResponseCategoryDto { Id = c.Id, Name = c.Name, ImageUrl = c.ImageUrl ?? string.Empty };
        }

        // create a category and upload image category
        public async Task<ResponseCategoryDto> CreateAsync(CreateCategoryDto dto)
        {
            // Save image if present
            string? imageUrl = null;
            if (dto.ImageUrl != null && dto.ImageUrl.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                var uniqueFileName = $"{Guid.NewGuid()}{Path.GetExtension(dto.ImageUrl.FileName)}";
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.ImageUrl.CopyToAsync(stream);
                }
                imageUrl = $"/uploads/{uniqueFileName}";
            }

            var category = new Category
            {
                Name = dto.Name,
                ImageUrl = imageUrl
            };

            await _repo.AddAsync(category);

            return new ResponseCategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                ImageUrl = category.ImageUrl ?? string.Empty
            };
        }

        // update the category
        public async Task<bool> UpdateAsync(int id, UpdateCategoryDto dto)
        {
            var cat = await _repo.GetByIdAsync(id);
            if (cat == null) return false;

            if (!string.IsNullOrWhiteSpace(dto.Name)) cat.Name = dto.Name;

            if (dto.ImageUrl != null && dto.ImageUrl.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                var uniqueFileName = $"{Guid.NewGuid()}{Path.GetExtension(dto.ImageUrl.FileName)}";
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.ImageUrl.CopyToAsync(stream);
                }
                cat.ImageUrl = $"/uploads/{uniqueFileName}";
            }

            await _repo.UpdateAsync(cat);
            return true;
        }


        // delete category
        public async Task<bool> DeleteAsync(int id)
        {
            var cat = await _repo.GetByIdAsync(id);
            if (cat == null) return false;

            await _repo.DeleteAsync(cat);
            return true;
        }
    }
}
