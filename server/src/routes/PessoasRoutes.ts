import * as express                                                        from 'express';
import { createPessoa, deletePessoa, getPessoa, getPessoas, updatePessoa } from '../controllers/PessoaController';
import Auth                                                                from '../controllers/AuthController';

const RouterPessoa = express.Router();

RouterPessoa.post('/pessoa',              createPessoa);
RouterPessoa.get('/pessoa/:cd_pessoa',    Auth.hasAuthorization, getPessoa);
RouterPessoa.get('/pessoa',               Auth.hasAuthorization, getPessoas);
RouterPessoa.put('/pessoa/:cd_pessoa',    Auth.hasAuthorization, updatePessoa);
RouterPessoa.delete('/pessoa/:cd_pessoa', Auth.hasAuthorization, deletePessoa);

export default RouterPessoa;