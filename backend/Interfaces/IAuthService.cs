using CartFlow.DTOs;
using CartFlow.Entities;

namespace CartFlow.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDto> RegisterAsync(RegisterDto dto);
        Task<AuthResponseDto> LoginAsync(LoginDto dto);
        AuthResponseDto GenerateJwtToken(User user);
    }
}
