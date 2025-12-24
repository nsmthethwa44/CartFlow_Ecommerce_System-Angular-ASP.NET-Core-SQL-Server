using CartFlow.Interfaces;
using CartFlow.DTOs;

namespace CartFlow.Services
{
    public class StatsService : IStatsService
    {
        private readonly IStatsRepository _repo;
        public StatsService(IStatsRepository repo)
        {
            _repo = repo;
        }

        public async Task<StatsDto> GetStatsAsync()
        {
            return new StatsDto
            {
                TotalCustomers = await _repo.CountUsersAsync(),
                TotalProducts = await _repo.CountProductsAsync(),
                TotalOrders = await _repo.CountOrdersAsync(),
                TotalCategories = await _repo.CountCategoriesAsync()
            };
        }
    }
}
