using Microsoft.EntityFrameworkCore;
using personal_api.src.components.transactions.repositories.dtos;
using personal_api.src.components.transactions;
using Microsoft.VisualBasic;

namespace personal_api.src.components.transactions.repositories
{
    public class TransactionRepository(ApiContext db) : ITransactionRepository
    {
        private readonly ApiContext _db = db;


        public async Task<List<TransactionDto>> GetTransactionFromUser(Guid id, int? year, int? month)
        {
            var user = await _db.Users.Include(u => u.Transactions).SingleOrDefaultAsync(u => u.Id == id)
                ?? throw new Exception("User was not found.");


            var query = user.Transactions.AsQueryable<TransactionModel>();
            if (year.HasValue)
            {
                int yearNumber = (int)year!;
                if (yearNumber < 2000)
                    throw new ArgumentException("The year is too old.");
                if (yearNumber > 3000)
                    throw new ArgumentException("The year is in the future.");

                query = query.Where(t => t.Reference.Year == (int)yearNumber!);
            }

            if (month.HasValue)
            {
                int monthNumber = (int)month!;
                if (monthNumber < 1 || monthNumber > 12)
                    throw new ArgumentException("The format of the month is incorrect. (Should be between 0 and 11).");
                query = query.Where(t => t.Reference.Month == (int)monthNumber!);
            }

            var transactions = query.Select(t => TransactionDto.FromModel(t)).ToList();

            return transactions;
        }

        public async Task<TransactionModel> CreateOut(CreateOut request, Guid id)
        {
            var user = await _db.Users.SingleOrDefaultAsync(u => u.Id == id)
                ?? throw new Exception("User was not found.");

            TransactionModel newOut = request.ToModel();
            user.Transactions.Add(newOut);

            _db.Transactions.Add(newOut);

            await _db.SaveChangesAsync();
            return newOut;
        }

        public async Task<Object> GetPaidPercentage(Guid id, int? year, int? month)
        {
            var user = await _db.Users.Include(u => u.Transactions).SingleOrDefaultAsync(u => u.Id == id)
                ?? throw new Exception("User was not found.");


            var query = user.Transactions.AsQueryable<TransactionModel>();
            if (year.HasValue)
            {
                int yearNumber = (int)year!;
                if (yearNumber < 2000)
                    throw new ArgumentException("The year is too old.");
                if (yearNumber > 3000)
                    throw new ArgumentException("The year is in the future.");

                query = query.Where(t => t.Reference.Year == (int)yearNumber!);
            }

            if (month.HasValue)
            {
                int monthNumber = (int)month!;
                if (monthNumber < 1 || monthNumber > 12)
                    throw new ArgumentException("The format of the month is incorrect. (Should be between 0 and 11).");
                query = query.Where(t => t.Reference.Month == (int)monthNumber!);
            }
            var allTransactions = query.ToList();
            var paidTransactions = allTransactions.Where(t => t.DatePaid.HasValue).ToList();


            int totalTransactions = allTransactions.Count;
            int paidTransactionsCount = paidTransactions.Count;
            double percentage = totalTransactions > 0
                ? Math.Round((double)paidTransactionsCount / totalTransactions * 100, 2)
                : 0.0;

            return new
            {
                paid = paidTransactionsCount,
                total = totalTransactions,
                percentage
            };
        }
    }
}