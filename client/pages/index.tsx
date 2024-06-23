import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

//IMPORTS DO USUARIO
import RegistrarUsuario from "@/pages/usuarios/registrarUsuario";
import ListarUsuario    from "@/pages/usuarios/listarUsuario";
import UpdateUsuario    from "@/pages/usuarios/updateUsuario";

//IMPORTS DO PESSOA
import RegistrarPessoas from "@/pages/pessoas/registrarPessoas";
import ListarPessoas    from "@/pages/pessoas/listarPessoas";
import UpdatePessoas    from "@/pages/pessoas/updatePessoas";

//IMPORTS DO MUSICAS
import RegistrarMusicas from "@/pages/musicas/registrarMusicas";
import ListarMusicas    from "@/pages/musicas/listarMusicas";
import UpdateMusicas    from "@/pages/musicas/updateMusicas";

//IMPORTS DO GENERO MUSICAS
import RegistrarGeneroMusicas from "@/pages/generosMusicais/registrarGenerosMusicais";
import ListarGenerosMusicais  from "@/pages/generosMusicais/listarGenerosMusicais";
import UpdateGenerosMusicais  from "@/pages/generosMusicais/updateGenerosMusicais";

//IMPORTS DO EVENTO
import RegistrarEventos from "@/pages/eventos/registrarEventos";
import ListarEventos    from "@/pages/eventos/listarEventos";
import AtualizarEventos from "@/pages/eventos/updateEventos";
import DetalharEvento   from "@/pages/eventos/detalharEvento";

import NavBar         from "@/components/navBar";
import ProtectedRoute from "@/components/protectRoute";
import Login          from "@/pages/login";

export default function Home() {
    return (
      <Router>
        <header>
          <NavBar/>
        </header>
          <main className="container">
            <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    {<h1>Projeto HolyCopy</h1>}
                    <br/>
                    <br/>
                    <ListarEventos/>
                  </ProtectedRoute>
                }
              />
              {/*ROTAS USUÁRIO*/}
              <Route
                path="/registrarUsuario"
                element={
                  <ProtectedRoute>
                    <RegistrarUsuario/>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/listarUsuario"
                element={
                  <ProtectedRoute>
                    <ListarUsuario/>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/atualizarUsuario/:itemId"
                element={
                  <ProtectedRoute>
                    <UpdateUsuario/>
                  </ProtectedRoute>
                }
              />
              {/*ROTAS Pessoas*/}
              <Route
                path="/registrarPessoas"
                element={
                  <ProtectedRoute>
                    <RegistrarPessoas/>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/listarPessoas"
                element={
                  <ProtectedRoute>
                    <ListarPessoas/>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/atualizarPessoas/:itemId"
                element={
                  <ProtectedRoute>
                    <UpdatePessoas/>
                  </ProtectedRoute>
                }
              />
              {/*ROTAS Musicas*/}
              <Route
                path="/registrarMusicas"
                element={
                  <ProtectedRoute>
                    <RegistrarMusicas/>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/listarMusicas"
                element={
                  <ProtectedRoute>
                    <ListarMusicas/>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/atualizarMusicas/:itemId"
                element={
                  <ProtectedRoute>
                    <UpdateMusicas/>
                  </ProtectedRoute>
                }
              />
              {/*ROTAS Generos Musicas*/}
              <Route
                path="/registrarGenero"
                element={
                  <ProtectedRoute>
                    <RegistrarGeneroMusicas/>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/listarGeneros"
                element={
                  <ProtectedRoute>
                    <ListarGenerosMusicais/>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/atualizarGenero/:itemId"
                element={
                  <ProtectedRoute>
                    <UpdateGenerosMusicais/>
                  </ProtectedRoute>
                }
              />
              {/*ROTAS Evento*/}
              <Route
                path="/registrarEvento"
                element={
                  <ProtectedRoute>
                    <RegistrarEventos/>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/atualizarEventos/:itemId"
                element={
                  <ProtectedRoute>
                    <AtualizarEventos/>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/detalharEvento/:itemId"
                element={
                  <ProtectedRoute>
                    <DetalharEvento/>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
      </Router>);
}
