using personal_api.src.components.users.repositories.dtos;

namespace personal_api.src.components.users.repositories;

public interface IUserRepository
{
    Task CreateUser(UserCreate request);
    Task<List<UserModel>> GetUsers();
    Task<UserModel> GetUser(Guid id);
    Task<UserModel> GetUsersAndTransactions(Guid id);
    Task DeleteUser(Guid id);
}
