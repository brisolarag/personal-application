using personal_api.src.components.transactions;

namespace personal_api.src.components.users;

public class UserModel
{
    public Guid Id { get; set; }
    public string FullName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public DateTime BirthDate { get; set; }
    public List<TransactionModel> Transactions { get; set; } = [];
}
