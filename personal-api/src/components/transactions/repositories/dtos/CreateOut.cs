using personal_api.src.components.users;

namespace personal_api.src.components.transactions.repositories.dtos;

public class CreateOut
{
    public required string Value { get; set; }
    public required DateTime Date { get; set; }
    public DateTime? DatePaid { get; set; }
    public required string Source { get; set; }
    public string? Card { get; set; }
    public required string Description { get; set; }


    public TransactionModel ToModel()
    {
        DateTime possibleReference = this.Date.AddMonths(-1);
        bool isNubankInvoice = this.Source.ToLower().Contains("nubank");

        TransactionModel newInvoice = new()
        {
            Id = Guid.NewGuid(),
            Value = this.Value,
            Type = TransactionType.OUT,
            Date = this.Date,
            Reference = isNubankInvoice ? possibleReference : this.Date,
            DatePaid = this.DatePaid,
            Source = this.Source,
            Card = this.Card,
            Description = this.Description,
        };
        return newInvoice;
    }

}
