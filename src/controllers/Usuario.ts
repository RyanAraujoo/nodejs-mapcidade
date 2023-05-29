import { Request, Response } from 'express'
import UsuarioService from '../services/UsuarioService'

const _usuarioService = new UsuarioService()

class Usuario {
    
    public async CriarUsuario(req: Request, res: Response) {
        try {
         await _usuarioService.CriarUsuario(req.body)
         return res.status(201).json({message: "Usuario cadastrado com sucesso!"})
          } catch (err) {
            if (err instanceof Error) {
              res.status(500).json({ error: err.message })
            }
          }
    }
    public async ConsultarUsuarioExistente(req: Request, res: Response) {
        try {
          await _usuarioService.ConsultarUsuarioExistente(req.query.email, req.query.senha)
          res.status(200).json({ message: "Usuário encontrado." })
          } catch (err) {
            if (err instanceof Error) {
              res.status(500).json({ error: err.message })
            }
          }
    }
}

export default new Usuario()