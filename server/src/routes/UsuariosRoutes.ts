import * as express                                                             from 'express';
import { createUsuario, deleteUsuario, getUsuario, getUsuarios, updateUsuario } from '../controllers/UsuarioController';
import Auth                                                                     from '../controllers/AuthController';

const RouterUsuario = express.Router();

RouterUsuario.post('/usuario/:cd_pessoa',   Auth.hasAuthorization, createUsuario);
RouterUsuario.get('/usuario/:cd_pessoa',    Auth.hasAuthorization, getUsuario);
RouterUsuario.get('/usuario',               Auth.hasAuthorization, getUsuarios);
RouterUsuario.put('/usuario/:cd_pessoa',    Auth.hasAuthorization, updateUsuario);
RouterUsuario.delete('/usuario/:cd_pessoa', Auth.hasAuthorization, deleteUsuario);

export default RouterUsuario;