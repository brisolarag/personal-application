using Microsoft.EntityFrameworkCore;
using personal_api.src.components.transactions;
using personal_api.src.components.users;

namespace personal_api.src;

public class ApiContext : DbContext
{
    public DbSet<UserModel> Users { get; set; }
    public DbSet<TransactionModel> Transactions { get; set; }

    public ApiContext(DbContextOptions<ApiContext> options) : base(options)
    {
    }
}
