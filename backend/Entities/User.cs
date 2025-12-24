namespace CartFlow.Entities
{
    // ------------------------------------
    // user model
    // ------------------------------------
    public class User
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;  // "Admin" |  "Customer"
        public string? ImageUrl { get; set; } // Store image directly
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
