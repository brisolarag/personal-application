using Microsoft.EntityFrameworkCore;
using personal_api.src.components.users.repositories.dtos;

namespace personal_api.src.components.users.repositories;

public class UserRepository(ApiContext db) : IUserRepository
{
    private readonly ApiContext _db = db;

    public async Task CreateUser(UserCreate request)
    {
        _db.Users.Add(request.ToModel());
        await _db.SaveChangesAsync();
    }

    public async Task<UserModel> GetUser(Guid id)
    {
        return await _db.Users.SingleOrDefaultAsync(u => u.Id == id) ?? throw new Exception("User was not found");
    }
    public async Task<UserModel> GetUsersAndTransactions(Guid id)
    {
        return await _db.Users.Include(u => u.Transactions).SingleOrDefaultAsync(u => u.Id == id) ?? throw new Exception("User was not found");
    }

    public async Task<List<UserModel>> GetUsers()
    {
        return await _db.Users.ToListAsync();
    }

    public async Task DeleteUser(Guid id)
    {
        _db.Remove(await _db.Users.Include(u => u.Transactions).SingleOrDefaultAsync(u => u.Id == id) ?? throw new Exception("User was not found"));
        await _db.SaveChangesAsync();
    }
}

