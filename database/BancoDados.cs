using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;


public class BancoDados
{

        readonly string connectionString = "Server=localhost;Port=3306;Database=hack;Uid=meu_usuario;Pwd=minha_senha;";
        public MySqlConnection Conexao()
    {
        return new MySqlConnection(connectionString);
    }

}
