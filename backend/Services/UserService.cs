using CartFlow.DTOs;
using CartFlow.Entities;
using CartFlow.Interfaces;

namespace CartFlow.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repo;

        public UserService(IUserRepository repo, IWebHostEnvironment env)
        {
            _repo = repo;
        }

        // get all users / this is for admin roles
        // map all user details, using Dto
        public async Task<IEnumerable<ResponseUserDto>> GetAllUsersAsync()
        {
            var users = await _repo.GetAllUsersAsync();
            return users.Select(u => new ResponseUserDto
            {
                Id = u.Id,
                Name = u.Name,
                Email = u.Email,
                Role = u.Role,
                ImageUrl = u.ImageUrl,
                CreatedAt = u.CreatedAt
            });
        }

    }

}
