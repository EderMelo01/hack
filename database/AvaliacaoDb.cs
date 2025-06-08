using MySql.Data.MySqlClient;

public class AvaliacoesDb
{
    public bool NewAvaliacao(Avaliacoes avaliacoes)
    {
        using (MySqlConnection connection = new BancoDados().Conexao())
        {
            connection.Open();
            string comando = $"INSERT INTO AVALIACAO (numero, descricao, metrica) values ( {avaliacoes.numero},'{avaliacoes.descricao}', '{avaliacoes.metrica}'  );";
            using (MySqlCommand insert = new MySqlCommand(comando, connection))
            {
                int rowsAffected = insert.ExecuteNonQuery();
                return rowsAffected > 0;
            }
        }
    }
    public List<Dictionary<string, dynamic>> GetAvaliacoes()
    {
        using (MySqlConnection connection = new BancoDados().Conexao())
        {
            connection.Open();
            string comando = $"SELECT * FROM AVALIACAO;";
            using (MySqlCommand select = new MySqlCommand(comando, connection))
            {
                using (var result = select.ExecuteReader())
                {
                    List<Dictionary<string, dynamic>> avaliacoes = [];
                        while (result.Read())
                        {
                            Dictionary<string, dynamic> avaliacao = new Dictionary<string, dynamic>(){
                                {"metricas", result.GetString("metrica")},
                                {"descricao", result.GetString("descricao")}
                            };
                            avaliacoes.Add(avaliacao);
                        }
                        return avaliacoes;
                } 
            }
        }
    }
}