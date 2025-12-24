namespace CartFlow.Entities
{
    // ------------------------------------
    // order model
    // ------------------------------------
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }           // Link to Users table (auth)
        public decimal Total { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string Status { get; set; } = "Pending"; // Pending, Paid, Shipped, Delivered
        public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
        public string? UserAddress { get; set; }
        public string? UserName { get; set; }
        public string? UserPhone { get; set; }
        public User User { get; set; } = null!;

    }
}
