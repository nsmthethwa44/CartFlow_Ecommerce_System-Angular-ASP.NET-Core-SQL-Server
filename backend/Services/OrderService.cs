using CartFlow.DTOs;
using CartFlow.Entities;
using CartFlow.Interfaces;

namespace CartFlow.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepo;
        private readonly ICartRepository _cartRepo;
        private readonly IProductRepository _productRepo;

        public OrderService(IOrderRepository orderRepo, ICartRepository cartRepo, IProductRepository productRepo)
        {
            _orderRepo = orderRepo;
            _cartRepo = cartRepo;
            _productRepo = productRepo;
        }

        // Place order from user's cart
        public async Task<ResponseOrderDto> PlaceOrderAsync(CreateOrderDto dto, int userId)
        {
            var cartItems = await _cartRepo.GetUserCartAsync(userId);
            if (!cartItems.Any())
                throw new InvalidOperationException("Cart is empty.");

            decimal total = 0m;
            var orderItems = new List<OrderItem>();

            foreach (var ci in cartItems)
            {
                var prod = await _productRepo.GetByIdAsync(ci.ProductId);
                if (prod == null)
                    throw new InvalidOperationException($"Product {ci.ProductId} not found.");

                if (prod.Stock < ci.Quantity)
                    throw new InvalidOperationException($"Insufficient stock for {prod.Name}.");

                prod.Stock -= ci.Quantity;
                await _productRepo.UpdateAsync(prod);

                orderItems.Add(new OrderItem
                {
                    ProductId = prod.Id,
                    ProductName = prod.Name,
                    PriceAtPurchase = prod.Price,
                    Quantity = ci.Quantity
                });

                total += prod.Price * ci.Quantity;
            }

            var order = new Order
            {
                UserId = userId, 
                UserName = dto.UserName,
                UserAddress = dto.UserAddress,
                UserPhone = dto.UserPhone,
                Total = total,
                Status = "Pending",
                CreatedAt = DateTime.UtcNow,
                Items = orderItems
            };

            await _orderRepo.AddAsync(order);
            await _cartRepo.ClearUserCartAsync(userId);

            return new ResponseOrderDto
            {
                Id = order.Id,
                UserId = order.UserId,
                Total = order.Total,
                Status = order.Status,
                CreatedAt = order.CreatedAt,
                Items = order.Items.Select(i => new OrderItemDto
                {
                    ProductId = i.ProductId,
                    ProductName = i.ProductName,
                    PriceAtPurchase = i.PriceAtPurchase,
                    Quantity = i.Quantity
                }).ToList()
            };
        }


        public async Task<IEnumerable<ResponseOrderDto>> GetUserOrdersAsync(int userId)
        {
            var orders = await _orderRepo.GetUserOrdersAsync(userId);
            return orders.Select(o => new ResponseOrderDto
            {
                Id = o.Id,
                UserId = o.UserId,
                Total = o.Total,
                Status = o.Status,
                CreatedAt = o.CreatedAt,
                Items = o.Items.Select(i => new OrderItemDto
                {
                    ProductId = i.ProductId,
                    ProductName = i.ProductName,
                    PriceAtPurchase = i.PriceAtPurchase,
                    Quantity = i.Quantity
                }).ToList()
            }).ToList();
        }

        //public async Task<IEnumerable<ResponseOrderDto>> GetAllOrdersAsync()
        //{
        //    var orders = await _orderRepo.GetAllAsync();
        //    return orders.Select(o => new ResponseOrderDto
        //    {
        //        Id = o.Id,
        //        UserId = o.UserId,
        //        Total = o.Total,
        //        Status = o.Status,
        //        CreatedAt = o.CreatedAt,
        //        Items = o.Items.Select(i => new OrderItemDto
        //        {
        //            ProductId = i.ProductId,
        //            ProductName = i.ProductName,
        //            PriceAtPurchase = i.PriceAtPurchase,
        //            Quantity = i.Quantity
        //        }).ToList()
        //    }).ToList();
        //}

        public async Task<IEnumerable<ResponseOrderDto>> GetAllOrdersAsync()
        {
            var orders = await _orderRepo.GetAllAsync();

            var result = new List<ResponseOrderDto>();

            foreach (var order in orders)
            {
                foreach (var item in order.Items)
                {
                    result.Add(new ResponseOrderDto
                    {
                        Id = order.Id,
                        ProductName = item.ProductName,
                        ProductImageUrl = item.Product?.ImageUrl ?? string.Empty,
                        Quantity = item.Quantity,
                        Total = item.PriceAtPurchase * item.Quantity,
                        Status = order.Status,
                        UserName = order.User?.Name ?? string.Empty,
                        UserImageUrl = order.User?.ImageUrl ?? string.Empty,
                        UserPhone = order.UserPhone ?? string.Empty,
                        UserAddress = order.UserAddress ?? string.Empty,
                        CreatedAt = order.CreatedAt
                    });
                }
            }

            return result;
        }


        public async Task<bool> UpdateStatusAsync(int orderId, string status)
        {
            var o = await _orderRepo.GetByIdAsync(orderId);
            if (o == null) return false;
            o.Status = status;
            await _orderRepo.UpdateAsync(o);
            return true;
        }
    }
   }
