import * as express from 'express'
import Auth         from '../controllers/AuthController';

const RouterLogin = express.Router()

RouterLogin.post('/auth', Auth.hasAuthorization, (req, res) => {
  return res.status(200);
});

export default RouterLogin