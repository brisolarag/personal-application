using Microsoft.AspNetCore.Mvc;
using personal_api.src.components.transactions.repositories;
using personal_api.src.components.transactions.repositories.dtos;

namespace personal_api.src.components.transactions;

[ApiController]
[Route("[controller]")]
public class TransactionController(ITransactionRepository repository) : ControllerBase
{
    private readonly ITransactionRepository _repository = repository;

    [HttpPost("OUT/{userId:guid}")]
    public async Task<ActionResult> CreateOut([FromBody] CreateOut request, Guid userId)
    {
        try
        {
            var transaction = await _repository.CreateOut(request, userId);
            return Ok(new { err = false, transactionId = transaction.Id });
        } catch (Exception ex)
        {
            return BadRequest(new {err = true, msg = ex.Message});
        }
    }

    [HttpGet("fromUser/{userId:guid}")]
    public async Task<ActionResult<TransactionDto>> GetTransactions(Guid userId, int? year, int? month)
    {
        try
        {
            var transactions = await _repository.GetTransactionFromUser(userId, year, month);
            return Ok(new { err = false, data = transactions, count = transactions.Count });
        }
        catch (Exception ex)
        {
            return BadRequest(new { err = true, msg = ex.Message });
        }
    }

    [HttpGet("fromUser/{userId:guid}/monthInfo")]
    public async Task<ActionResult> GetPaidPercentage(Guid userId, int? year, int? month)
    {
        try
        {
            var percentage = await _repository.GetPaidPercentage(userId, year, month);
            return Ok(new { err = false, data = percentage });
        }
        catch (Exception ex)
        {
            return BadRequest(new { err = true, msg = ex.Message });
        }
    }
}
    