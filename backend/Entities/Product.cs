namespace CartFlow.Entities
{

    // ------------------------------------
    // product model
    // ------------------------------------
    public class Product
    {
        public int Id { get; set; }                  // PK
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string? ImageUrl { get; set; }
        public int? CategoryId { get; set; }
        public Category? Category { get; set; }
        public int Stock { get; set; } = 0;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
