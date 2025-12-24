namespace CartFlow.DTOs
{
    // ------------------------------------
    //  cart DTOs
    // ------------------------------------
    public class AddToCartDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; } = 1;
    }

    public class CartItemDto
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; } = "";
        public int ProductId { get; set; }
        public string Name { get; set; } = string.Empty; 
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }

}
