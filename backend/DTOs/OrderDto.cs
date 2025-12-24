namespace CartFlow.DTOs
{

    // ------------------------------------
    //  order DTOs
    // ------------------------------------
    public class ResponseOrderDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public decimal Total { get; set; }
        public string Status { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<OrderItemDto> Items { get; set; } = new();
        public string ProductImageUrl { get; set; } = string.Empty;
        public string ProductName { get; set; } = string.Empty;
        public string UserImageUrl { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string UserPhone { get; set; } = string.Empty;
        public string UserAddress { get; set; } = string.Empty;
    }

    public class CreateOrderDto
    {
        public string UserName { get; set; } = string.Empty;
        public string UserAddress { get; set; } = string.Empty;
        public string UserPhone { get; set; } = string.Empty;
    }
  
    public class OrderItemDto {
        public int ProductId { get; set; } 
        public string ProductName { get; set; } = string.Empty; 
        public decimal PriceAtPurchase { get; set; } 
        public  int Quantity { get; set; }
    }
}
