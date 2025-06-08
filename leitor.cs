using ClosedXML.Excel;


public class Leitor
{
    public List<Avaliacoes> LerAvaliacoes()
    {
        var caminhoArquivo= "opinioes_clientes_200.xlsx";
        var listaAvaliacoes = new List<Avaliacoes>();

        using (var workbook = new XLWorkbook(caminhoArquivo))
        {
            var planilha = workbook.Worksheet(1); // primeira aba
            var linhas = planilha.RangeUsed().RowsUsed();

            foreach (var linha in linhas) // pula o cabeçalho
            {
                var avaliacao = new Avaliacoes
                {
                    numero = int.Parse(linha.Cell(1).GetValue<string>()),
                    descricao = linha.Cell(2).GetValue<string>(),
                    metrica = linha.Cell(3).GetValue<string>()
                };

                listaAvaliacoes.Add(avaliacao);
            }
        }

        return listaAvaliacoes;
    }
}
