using CartFlow.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace CartFlow.Interfaces
{
    // ------------------------------------
    //  User repository
    // ------------------------------------
    public interface IUserRepository
    {
        Task<User?> getUserByEmailAsync(string email);
        Task AddUserAsync(User user);
        Task<IEnumerable<User>> GetAllUsersAsync(); // for admin
        Task<User?> GetByIdAsync(int id);
        Task<bool> UpdateAsync(User user);
    }
}
