import UsuarioModel from "../models/UsuarioModel";
import mysql_connection  from '../data/database/connection'

class UsuarioRepository {

    private validarConexaoBancoDeDados() {
        mysql_connection.connect((error) => {
            if (error) {
                const erro = new Error("Erro ao conectar ao banco de dados");
                throw erro;
            }
          });
    }

    private fecharConexaoComBancoDeDados() {
        mysql_connection.end((error) => {
            if (error) {
              return;
            }
          });
    }

    public CriarUsuario(usuario: UsuarioModel) {
        //this.validarConexaoBancoDeDados()
        mysql_connection.query('INSERT INTO usuario SET ?', usuario, (error) => {
            if (error) {
                const erro = new Error("Falha ao criar Usuário");
                throw erro;
            }
          });
      //  this.fecharConexaoComBancoDeDados()
    }

    public ConsultarUsuarioExistente(email: string ,senha: string) {
       // this.validarConexaoBancoDeDados()
        mysql_connection.query('SELECT * FROM usuario WHERE email = ? AND senha = ?',[email, senha], (error) => {
            if (error) {
                const erro = new Error("Usuario não encontrado. Verifique as credenciais!");
                throw erro;
            }
          });
        // this.fecharConexaoComBancoDeDados()
    }
}

export default UsuarioRepository