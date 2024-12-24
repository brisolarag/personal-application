using personal_api.src.components.transactions.repositories;
using personal_api.src.components.users.repositories;

namespace personal_api.extensions;

public static class Scopeds
{
    public static void AddAppScopeds( this WebApplicationBuilder builder )
    {
        builder.Services.AddScoped<IUserRepository, UserRepository>();
        builder.Services.AddScoped<ITransactionRepository, TransactionRepository>();
    }
}
