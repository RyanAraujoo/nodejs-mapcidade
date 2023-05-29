import Router from "express";
import Usuario from './controllers/Usuario'
const routes = Router()

routes.post("/mapcidade/v1/usuarios", Usuario.CriarUsuario)
routes.get("/mapcidade/v1/usuarios", Usuario.ConsultarUsuarioExistente)

export default routes