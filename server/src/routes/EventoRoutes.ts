import * as express                                                        from 'express';
import { createEvento, deleteEvento, getEvento, getEventos, updateEvento } from '../controllers/EventoController';
import Auth                                                                from '../controllers/AuthController';

const RouterEvento = express.Router();

RouterEvento.post('/evento',              Auth.hasAuthorization, createEvento);
RouterEvento.get('/evento/:cd_evento',    Auth.hasAuthorization, getEvento);
RouterEvento.get('/evento',               Auth.hasAuthorization, getEventos);
RouterEvento.put('/evento/:cd_evento',    Auth.hasAuthorization, updateEvento);
RouterEvento.delete('/evento/:cd_evento', Auth.hasAuthorization, deleteEvento);

export default RouterEvento;