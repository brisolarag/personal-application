using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace personal_api.src.components.users.repositories.dtos;

public class UserCreate
{
    public string FullName { get; set; } = null!;
    public DateTime BirthDate { get; set; }
    public string Email { get; set; } = null!;

    public UserModel ToModel()
    {
        return new UserModel
        {
            Id = Guid.NewGuid(),
            FullName = FullName,
            BirthDate = BirthDate,
            Email = Email
        };
    }
}
