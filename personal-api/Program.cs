using Microsoft.EntityFrameworkCore;
using personal_api.extensions;
using personal_api.src;
using personal_api.src.components.users.repositories;

var builder = WebApplication.CreateBuilder(args);

builder.AddSqliteContext();
builder.IgnoreCycles();


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.AddAppScopeds();

builder.AddCorsPolicies("Free");

var app = builder.Build();

app.UseCors("Free");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
