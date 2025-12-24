namespace CartFlow.Entities
{
    // ------------------------------------
    // order item model
    // ------------------------------------
    public class OrderItem
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public Product? Product { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal PriceAtPurchase { get; set; }
        public Order? Order { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public decimal SubTotal => PriceAtPurchase * Quantity;
    }
}
