using CartFlow.DTOs;

namespace CartFlow.Interfaces
{
    public interface IStatsService
    {
        Task<StatsDto> GetStatsAsync();
    }
}
