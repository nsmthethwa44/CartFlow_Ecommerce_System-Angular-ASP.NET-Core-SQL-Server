namespace CartFlow.Entities
{
    // ------------------------------------
    // categor model
    // ------------------------------------
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public List<Product> Products { get; set; } = new();
    }
}
