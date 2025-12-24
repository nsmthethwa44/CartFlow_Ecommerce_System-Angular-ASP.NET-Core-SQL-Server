using CartFlow.DTOs;
using CartFlow.Entities;
using CartFlow.Interfaces;

namespace CartFlow.Services
{
    public class CartService : ICartService
    {
        private readonly ICartRepository _cartRepo;
        private readonly IProductRepository _productRepo;

        public CartService(ICartRepository cartRepo, IProductRepository productRepo)
        {
            _cartRepo = cartRepo;
            _productRepo = productRepo;
        }

        // Return user's cart items mapped to CartItemDto
        public async Task<IEnumerable<CartItemDto>> GetCartByUserIdAsync(int userId)
        {
            var items = await _cartRepo.GetUserCartAsync(userId);
            var result = new List<CartItemDto>();

            foreach (var i in items)
            {
                result.Add(new CartItemDto
                {
                    Id = i.Id,
                    ProductId = i.ProductId,
                    Name = i.Product?.Name ?? string.Empty,
                    ImageUrl = i.Product?.ImageUrl ?? string.Empty,
                    Price = i.Product?.Price ?? 0,
                    Quantity = i.Quantity
                });
            }

            return result;
        }

        // Add to cart
        public async Task AddToCartAsync(int userId, AddToCartDto dto)
        {
            // validate product exists
            var p = await _productRepo.GetByIdAsync(dto.ProductId);
            if (p == null) throw new InvalidOperationException("Product not found.");

            var existing = await _cartRepo.GetCartItemAsync(userId, dto.ProductId);
            if (existing == null)
            {
                var item = new CartItem
                {
                    UserId = userId,
                    ProductId = dto.ProductId,
                    Quantity = dto.Quantity
                };
                await _cartRepo.AddAsync(item);
                return;
            }

            // if exists, increase quantity
            existing.Quantity += dto.Quantity;
            await _cartRepo.UpdateAsync(existing);
        }

        //merge cart 
        public async Task MergeCartAsync(int userId, List<AddToCartDto> items)
        {
            foreach (var dto in items)
            {
                var existing = await _cartRepo.GetCartItemAsync(userId, dto.ProductId);

                if (existing == null)
                {
                    var item = new CartItem
                    {
                        UserId = userId,
                        ProductId = dto.ProductId,
                        Quantity = dto.Quantity
                    };
                    await _cartRepo.AddAsync(item);
                }
                else
                {
                    existing.Quantity += dto.Quantity;
                    await _cartRepo.UpdateAsync(existing);
                }
            }
        }


        // update cart quantity
        public async Task UpdateQuantityAsync(int userId, int productId, int quantity)
        {
            if (quantity <= 0) throw new ArgumentException("Quantity must be > 0");

            var item = await _cartRepo.GetCartItemAsync(userId, productId);
            if (item == null) throw new InvalidOperationException("Cart item not found.");

            item.Quantity = quantity;
            await _cartRepo.UpdateAsync(item);
        }

        // remove product from cart
        public async Task RemoveFromCartAsync(int userId, int productId)
        {
            var item = await _cartRepo.GetCartItemAsync(userId, productId);
            if (item == null) return;
            await _cartRepo.RemoveAsync(item);
        }

        public async Task ClearCartAsync(int userId)
        {
            await _cartRepo.ClearUserCartAsync(userId);
        }
    }
}
