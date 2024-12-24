using Microsoft.EntityFrameworkCore;
using personal_api.src.components.transactions.repositories.dtos;
using personal_api.src.components.transactions;
using Microsoft.VisualBasic;

namespace personal_api.src.components.transactions.repositories;

public class TransactionRepository(ApiContext db) : ITransactionRepository
{
    private readonly ApiContext _db = db;

    public async Task<List<TransactionModel>> GetTransactionFromUser (Guid id, string? refDate)
    {
        var user = await _db.Users.Include(u => u.Transactions).SingleOrDefaultAsync(u => u.Id == id) ?? throw new Exception("User was not found.");
        if (string.IsNullOrEmpty(refDate))
            return user.Transactions;


        DateTime reference;

        // Split the date string
        var parts = refDate.Split('-');
        if (parts.Length != 2)
            throw new ArgumentException("The date format is incorrect. Please use 'yyyy-MM-dd'.");

        if (!int.TryParse(parts[0], out int year) || !int.TryParse(parts[1], out int month))
            throw new ArgumentException("The date parts must be valid integers.");

        try
        {
            reference = new DateTime(year, month, 1);
        }
        catch (ArgumentOutOfRangeException)
        {
            throw new ArgumentException("The date provided is not valid.");
        }

        var transactions = user.Transactions.Where(t => (t.Reference.Month == reference.Month) && (t.Reference.Year == reference.Year)).ToList();
        return transactions;
    }

    public async Task<TransactionModel> CreateOut(CreateOut request, Guid id)
    {
        var user = await _db.Users.SingleOrDefaultAsync(u => u.Id == id) ?? throw new Exception("User was not found.");
        TransactionModel newOut = request.ToModel();
        user.Transactions.Add(newOut);

        _db.Transactions.Add(newOut);

        await _db.SaveChangesAsync();
        return newOut;
    }




}
