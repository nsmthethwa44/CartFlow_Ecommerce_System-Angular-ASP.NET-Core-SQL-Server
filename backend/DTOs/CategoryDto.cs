namespace CartFlow.DTOs
{
    // ------------------------------------
    //  category DTOs
    // ------------------------------------
    public class ResponseCategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
    }

    public class CreateCategoryDto
    {
        public string Name { get; set; } = string.Empty;
        public IFormFile? ImageUrl { get; set; }
    }

    public class UpdateCategoryDto
    {
        public string? Name { get; set; }
        public IFormFile? ImageUrl { get; set; }
    }


}
