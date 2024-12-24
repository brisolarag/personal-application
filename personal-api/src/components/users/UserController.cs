using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using personal_api.src.components.users.repositories;
using personal_api.src.components.users.repositories.dtos;

namespace personal_api.src.components.users;

[ApiController]
[Route("[controller]")]
public class UserController(IUserRepository repository) : ControllerBase
{
    private readonly IUserRepository _repository = repository;

    [HttpPost]
    public async Task<ActionResult> CreateUser([FromBody] UserCreate request)
    {
        try
        {
            await _repository.CreateUser(request);
            return Ok(new { err = false });
        }
        catch (Exception ex)
        {
            return BadRequest(new { err = true, msg = ex.Message });
        }
    }

    [HttpGet]
    public async Task<ActionResult<List<UserModel>>> AllUsers()
    {
        try
        {
            var users = await _repository.GetUsers();
            return Ok(new { err = false, count = users.Count, data = users });
        }
        catch (Exception ex)
        {
            return BadRequest(new { err = true, msg = ex.Message });
        }
    }

    [HttpGet("poor/{id:guid}")]
    public async Task<ActionResult<UserModel>> GetUserPoor(Guid id)
    {
        try
        {
            var user = await _repository.GetUser(id);
            return Ok(new { err = false, count = 1, data = user });
        } catch (Exception ex)
        {
            return BadRequest(new { err = true, msg = ex.Message });
        }
    }

    [HttpGet("rich/{id:guid}")]
    public async Task<ActionResult<UserModel>> GetUserRich(Guid id)
    {
        try
        {
            var user = await _repository.GetUsersAndTransactions(id);
            return Ok(new { err = false, count = 1, data = user });
        }
        catch (Exception ex)
        {
            return BadRequest(new { err = true, msg = ex.Message });
        }
    }

    [HttpDelete("{id:guid}")]
    public async Task<ActionResult> DeleteUser (Guid id)
    {
        try
        {
            await _repository.DeleteUser(id);
            return Ok(new { err = false });
        }
        catch (Exception ex)
        {
            return BadRequest(new { err = true, msg = ex.Message });
        }
    }
}
