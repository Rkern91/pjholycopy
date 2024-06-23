import * as express                                                        from 'express';
import { createMusica, deleteMusica, getMusica, getMusicas, updateMusica } from '../controllers/MusicasController';
import Auth                                                                from '../controllers/AuthController';

const RouterMusica = express.Router();

RouterMusica.post('/musica',              Auth.hasAuthorization, createMusica);
RouterMusica.get('/musica/:cd_musica',    Auth.hasAuthorization, getMusica);
RouterMusica.get('/musica',               Auth.hasAuthorization, getMusicas);
RouterMusica.put('/musica/:cd_musica',    Auth.hasAuthorization, updateMusica);
RouterMusica.delete('/musica/:cd_musica', Auth.hasAuthorization, deleteMusica);

export default RouterMusica;