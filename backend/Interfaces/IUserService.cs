using CartFlow.DTOs;
using CartFlow.Entities;

namespace CartFlow.Interfaces
{
    // ------------------------------------
    //  User Service
    // ------------------------------------
    public interface IUserService
    {
        Task<IEnumerable<ResponseUserDto>> GetAllUsersAsync(); // for admin getting all users
        //Task<User> UpdateUserAsync(int userId, UpdateUserDto dto);
    }
}
