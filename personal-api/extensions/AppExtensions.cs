using Microsoft.EntityFrameworkCore;
using personal_api.src;

namespace personal_api.extensions;

public static class AppExtensions
{
    public static void AddSqliteContext( this WebApplicationBuilder builder )
    {
        builder.Services.AddDbContext<ApiContext>(options => {
            options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
            if (builder.Environment.IsDevelopment())
            {
                options.EnableSensitiveDataLogging().LogTo(Console.WriteLine);
                options.LogTo(Console.WriteLine, LogLevel.Debug);
            }
        });
    }

    public static void IgnoreCycles(this WebApplicationBuilder builder )
    {
        builder.Services.AddControllers().AddJsonOptions(options => {
            options.JsonSerializerOptions.ReferenceHandler =
                System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
        });
    }

    public static void AddCorsPolicies(this WebApplicationBuilder builder, string policyName )
    {
        builder.Services.AddCors(options => {
            options.AddPolicy(policyName, policy => {
                policy.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        });
    }
}
