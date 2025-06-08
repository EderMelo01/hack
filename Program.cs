using System.Net;


var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
var app = builder.Build();

app.MapControllers();

app.UseDefaultFiles();
app.UseStaticFiles();




app.MapPost("/api/save", async context =>
{
    try
    {

    }
    catch (Exception)
    {

        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        await context.Response.WriteAsync("Erro interno no servidor");
    }
});


app.Run();
