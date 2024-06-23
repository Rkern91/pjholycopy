import { Link } from "react-router-dom";
import Logout from "@/components/logout";
import AuthContext from "@/components/authContext";
import { useContext } from "react";

export default function NavBar() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    isAuthenticated ? (
      <nav className="sidebar bg-dark">
        <div className="sidebar-content">
          <Link to="/" className="navbar-brand px-3">
            <span className="navbar-text">Agendamentos</span>
          </Link>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to={"/registrar"} className="nav-link">
                Registrar Usuário
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/listar"} className="nav-link">
                Listar
              </Link>
            </li>
            <li className="nav-item mt-auto">
              <Logout />
            </li>
          </ul>
        </div>
      </nav>
    ) : null
  );
}
