import express         from 'express';
import {AppDataSource} from './data-source';
import cors            from 'cors';

// IMPORTS DE ROTAS
import RotasPessoas  from './routes/PessoasRoutes';
import RotasUsuario  from './routes/UsuariosRoutes';
import RotasGenero   from './routes/GeneroMusicasRoutes';
import RotasEvento   from './routes/EventoRoutes';
import RotasMusica   from './routes/MusicasRoutes';
import RouterLogin   from './routes/LoginRoutes';
import RouterAuth    from './routes/AuthRoutes';

// CONFIGURAÇÕES
AppDataSource.initialize().then(function (){
  console.log('Banco de dados inicializado!');
}).catch(function (error){
  console.log('Erro na inicialização do banco de dados: ', error);
});

const app  = express();
const port = 3001;

app.use(express.json());
app.use(cors());

// ROTAS
app.use('/', RouterAuth);
app.use('/', RouterLogin);
app.use('/', RotasPessoas);
app.use('/', RotasUsuario);
app.use('/', RotasGenero);
app.use('/', RotasEvento);
app.use('/', RotasMusica);

// START
app.listen(port, () =>{
  console.log(`[SERVER]: Server rodando em http://localhost:${port}`);
});