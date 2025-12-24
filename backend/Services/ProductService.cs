using CartFlow.DTOs;
using CartFlow.Entities;
using CartFlow.Interfaces;

namespace CartFlow.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepo;
        private readonly ICategoryRepository _categoryRepo;
        private readonly ICartRepository _cartRepo;

        public ProductService(IProductRepository productRepo, ICategoryRepository categoryRepo, ICartRepository cartRepo)
        {
            _productRepo = productRepo;
            _categoryRepo = categoryRepo;
            _cartRepo = cartRepo;
        }

        // Get all products and map to ResponseProductDto
        public async Task<IEnumerable<ResponseProductDto>> GetAllAsync()
        {
            var products = await _productRepo.GetAllAsync();
            var result = new List<ResponseProductDto>();

            foreach (var p in products)
            {
                result.Add(new ResponseProductDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category?.Name ?? string.Empty,
                    Stock = p.Stock,
                    Price = p.Price,
                    ImageUrl = p.ImageUrl ?? string.Empty
                });
            }

            return result;
        }

        // Get single product
        public async Task<ResponseProductDto?> GetByIdAsync(int id)
        {
            var p = await _productRepo.GetByIdAsync(id);
            if (p == null) return null;

            return new ResponseProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                //CategoryId = p.CategoryId,
                CategoryName = p.Category?.Name ?? string.Empty,
                Stock = p.Stock,
                Price = p.Price,
                ImageUrl = p.ImageUrl ?? string.Empty
            };
        }

        // Create product, including saving uploaded image (if any)
        public async Task<ResponseProductDto> CreateAsync(CreateProductDto dto)
        {
            // Validate category exists
            var cat = await _categoryRepo.GetByIdAsync(dto.CategoryId);
            if (cat == null)
                throw new InvalidOperationException("Category does not exist.");

            // Save image (if provided)
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

            // Create entity
            var product = new Product
            {
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
                CategoryId = dto.CategoryId,
                ImageUrl = imageUrl,
                Stock = dto.Stock,
            };

            // Persist via repository
            await _productRepo.AddAsync(product);

            // Build response DTO
            var response = new ResponseProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                CategoryId = product.CategoryId,
                CategoryName = cat.Name,
                Stock = product.Stock,
                Price = product.Price,
                ImageUrl = product.ImageUrl ?? string.Empty
            };

            return response;
        }

        // Update product - note UpdateProductDto.ImageUrl should be IFormFile? for file uploads.
        public async Task<ResponseProductDto?> UpdateAsync(int id, UpdateProductDto dto)
        {
            var product = await _productRepo.GetByIdAsync(id);
            if (product == null)
                return null;

            //  Update fields only if provided 
            if (!string.IsNullOrWhiteSpace(dto.Name))
                product.Name = dto.Name;

            if (!string.IsNullOrWhiteSpace(dto.Description))
                product.Description = dto.Description;

            if (dto.Price.HasValue)
                product.Price = dto.Price.Value;

            if (dto.CategoryId.HasValue)
                product.CategoryId = dto.CategoryId.Value;

            if (dto.Stock.HasValue)
                product.Stock = dto.Stock.Value;

            // Handle optional new image
            if (dto.ImageUrl != null && dto.ImageUrl.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads");
                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                var uniqueFileName = $"{Guid.NewGuid()}{Path.GetExtension(dto.ImageUrl.FileName)}";
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.ImageUrl.CopyToAsync(stream);
                }

                product.ImageUrl = $"/uploads/{uniqueFileName}";
            }

            await _productRepo.UpdateAsync(product);

            //  Return mapped DTO manually 
            return new ResponseProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                ImageUrl = product.ImageUrl ?? "",
                CategoryId = product.CategoryId,
                CategoryName = product.Category?.Name ?? "",
                Price = product.Price,
                Stock = product.Stock
            };
        }


        public async Task<bool> DeleteAsync(int id)
        {
            var p = await _productRepo.GetByIdAsync(id);
            if (p == null) return false;

            await _productRepo.DeleteAsync(p);
            return true;
        }

        // get products by category id
        public async Task<List<ResponseProductDto>> GetByCategoryAsync(int categoryId)
        {
            var items = await _productRepo.GetPagedAsync(categoryId);
            return items.Select(p => new ResponseProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                CategoryId = p.CategoryId,
                CategoryName = p.Category?.Name ?? string.Empty,
                Stock = p.Stock,
                Price = p.Price,
                ImageUrl = p.ImageUrl ?? string.Empty
            }).ToList();
        }
    }
}
