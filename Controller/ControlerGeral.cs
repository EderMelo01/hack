using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("app/geral")]
public class ControleContas : ControllerBase
{
    AvaliacoesDb dbAvaliacao = new();

    [HttpPost("novaConta")]
    public IActionResult NovaAvaliacao([FromBody] Avaliacoes avaliacoes)
    {
        return dbAvaliacao.NewAvaliacao(avaliacoes) ? NoContent() : BadRequest();
    }
    [HttpGet("getAvaliacoes")]
    public IActionResult GetAvaliacoes()
    {
        var retorno = dbAvaliacao.GetAvaliacoes();
        return retorno.Count > 0 ? Ok(retorno) : NotFound(new { message = "Não localizado" });
    }
}