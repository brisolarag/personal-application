using personal_api.src.components.transactions.repositories.dtos;

namespace personal_api.src.components.transactions.repositories;

public interface ITransactionRepository
{
    Task<TransactionModel> CreateOut(CreateOut request, Guid id);
    Task<List<TransactionDto>> GetTransactionFromUser(Guid id, int? year, int? month);
    Task<Object> GetPaidPercentage(Guid id, int? year, int? month);
}
