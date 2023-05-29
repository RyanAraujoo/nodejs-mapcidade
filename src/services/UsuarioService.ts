const Joi = require('joi');
import UsuarioModel from "../models/UsuarioModel";
import UsuarioRepository from "../repository/UsuarioRepository";

const _usuarioRepository = new UsuarioRepository();
class UsuarioService{

    public async CriarUsuario(body: UsuarioModel) {
      let _usuarioDto = Joi.object({
        email: Joi.string().required(),
        nome: Joi.string().required(),
        sobrenome: Joi.string().required(),
        data_de_nascimento: Joi.string().required(),
        cpf: Joi.string().required(),
        cep: Joi.string().required(),
        senha: Joi.string().required()
      })

      let _usuario: UsuarioModel = {
        email: body.email,
        nome: body.nome,
        sobrenome: body.sobrenome,
        data_de_nascimento: body.data_de_nascimento,
        cpf: body.cpf,
        cep: body.cep,
        senha: body.senha
      }

     const {error} = _usuarioDto.validate(_usuario)
     if (error) {
      const erro = new Error(error.details);
      throw erro;
    } 
      await _usuarioRepository.CriarUsuario(_usuario)
    }

    public async ConsultarUsuarioExistente(email: any ,senha: any) {
      if (email == null) {
        const erro = new Error("Email não especificado.");
        throw erro;
      }

      if (senha == null) {
        const erro = new Error("Senha não especificada.");
        throw erro;
      }

      await _usuarioRepository.ConsultarUsuarioExistente(email,senha)
    }
   
} 
export default UsuarioService
    
