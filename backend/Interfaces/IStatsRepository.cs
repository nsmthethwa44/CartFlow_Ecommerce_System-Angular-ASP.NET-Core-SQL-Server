namespace CartFlow.Interfaces
{
    public interface IStatsRepository
    {
        Task<int> CountUsersAsync();
        Task<int> CountProductsAsync();
        Task<int> CountOrdersAsync();
        Task<int> CountCategoriesAsync();
    }
}
