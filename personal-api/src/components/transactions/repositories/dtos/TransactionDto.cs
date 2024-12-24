using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace personal_api.src.components.transactions.repositories.dtos;
public class TransactionDto
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

    public static TransactionDto FromModel(TransactionModel model)
    {
        return new TransactionDto
        {
            Id = model.Id,
            Value = model.Value,
            Type = model.Type,
            Date = model.Date,
            Reference = model.Reference,
            DatePaid = model.DatePaid,
            Source = model.Source,
            Card = model.Card,
            Description = model.Description
        };
    }
}