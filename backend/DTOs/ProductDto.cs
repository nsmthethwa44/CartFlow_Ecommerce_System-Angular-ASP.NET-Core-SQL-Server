namespace CartFlow.DTOs
{
    // ------------------------------------
    //  product DTOs
    // ------------------------------------
    public class ResponseProductDto
    {
       public int Id { get; set; }
       public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int? CategoryId { get; set; }
        public int Stock { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
       public string CategoryName { get; set; } = string.Empty ;
    }

    public class CreateProductDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Stock { get; set; }
        public decimal Price { get; set; }
        public IFormFile? ImageUrl { get; set; }
        public int CategoryId { get; set; }
    }

    public class UpdateProductDto
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public IFormFile? ImageUrl { get; set; }
        public int? CategoryId { get; set; }
        public int? Stock { get; set; }
    }

}
