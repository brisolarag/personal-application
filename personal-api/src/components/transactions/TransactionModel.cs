using System.Runtime.CompilerServices;
using personal_api.src.components.users;

namespace personal_api.src.components.transactions;


public enum TransactionType { IN, OUT }
public class TransactionModel
{
    public Guid Id { get; set; }
    public string Value { get; set; } = null!;
    public TransactionType Type { get; set; }
    public DateTime Date { get; set; }
    public DateTime Reference { get; set; }
    public DateTime? DatePaid { get; set; }
    public string Source { get; set; } = null!;
    public string? Card { get; set; }
    public string Description { get; set; } = null!;

    public UserModel User { get; set; } 
}
