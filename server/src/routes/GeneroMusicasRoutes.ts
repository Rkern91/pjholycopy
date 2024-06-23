import * as express                                                                                      from 'express';
import { createGeneroMusica, deleteGeneroMusica, getGeneroMusica, getGeneroMusicas, updateGeneroMusica } from '../controllers/GeneroMusicasController';
import Auth                                                                                              from '../controllers/AuthController';

const RouterGeneroMusica = express.Router();

RouterGeneroMusica.post('/genero',              Auth.hasAuthorization, createGeneroMusica);
RouterGeneroMusica.get('/genero/:cd_genero',    Auth.hasAuthorization, getGeneroMusica);
RouterGeneroMusica.get('/genero',               Auth.hasAuthorization, getGeneroMusicas);
RouterGeneroMusica.put('/genero/:cd_genero',    Auth.hasAuthorization, updateGeneroMusica);
RouterGeneroMusica.delete('/genero/:cd_genero', Auth.hasAuthorization, deleteGeneroMusica);

export default RouterGeneroMusica;