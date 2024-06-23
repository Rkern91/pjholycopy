import {Link}                                    from "react-router-dom";
import Logout                                    from "@/components/logout";
import AuthContext                               from "@/components/authContext";
import {useContext, useState, useEffect, useRef} from "react";

export default function NavBar() {
  const {isAuthenticated}               = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState({
    eventos:  false,
    pessoas:  false,
    usuarios: false,
    musicas:  false,
    genero:   false
  });

  const sidebarRef     = useRef(null);
  const toggleDropdown = (menu: string) => {
    setDropdownOpen(prevState => ({
      ...prevState,
      [menu]: !prevState[menu]
    }));
  };

  const closeDropdowns = () => {
    setDropdownOpen({
      eventos:  false,
      pessoas:  false,
      usuarios: false,
      musicas:  false,
      genero:   false
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: { target: any; }) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target))
        closeDropdowns();
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);

  return (
    isAuthenticated ? (
      <>
        <style jsx="true">{`
            .sidebar {
                position: fixed;
                top: 0;
                left: 0;
                height: 100%;
                width: 250px;
                background-color: #343a40;
                display: flex;
                flex-direction: column;
                padding-top: 30px;
            }

            .sidebar .nav-link {
                color: rgba(255, 255, 255, 0.5);
                text-align: left;
                padding: 10px 20px;
                cursor: pointer;
            }

            .sidebar .nav-link:hover {
                color: rgba(255, 255, 255, 0.75);
                background-color: #495057;
            }

            .navbar-brand, .navbar-text {
                color: white;
            }

            .mt-auto {
                margin-top: auto;
            }

            .dropdown-menu {
                background-color: #ffffff; /* Cor de fundo clara */
                border: none;
                display: none;
                flex-direction: column;
                position: relative;
                z-index: 1000; /* Garante que os dropdowns fiquem acima de outros elementos */
            }

            .dropdown-menu.show {
                display: flex;
            }

            .dropdown-item {
                color: #343a40; /* Cor do texto escura */
                padding: 10px 20px;
            }

            .dropdown-item:hover {
                color: #495057; /* Cor do texto ao passar o mouse */
                background-color: rgba(0, 0, 0, 0.1); /* Cor de fundo ao passar o mouse */
            }
        `}</style>
        <div className="sidebar" ref={sidebarRef}>
          <Link to="/" className="navbar-brand px-3">
            <h3><span className="navbar-text">HolyCopy</span></h3>
          </Link>
          <ul className="nav flex-column">
            <li className="nav-item">
              <div className="nav-link" onClick={() => toggleDropdown('eventos')}>Eventos</div>
              <ul className={`dropdown-menu ${dropdownOpen.eventos ? 'show' : ''}`}>
                <li>
                  <Link to="/registrarEvento" className="dropdown-item">
                    Registrar
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <div className="nav-link" onClick={() => toggleDropdown('musicas')}>Músicas</div>
              <ul className={`dropdown-menu ${dropdownOpen.musicas ? 'show' : ''}`}>
                <li>
                  <Link to="/registrarMusicas" className="dropdown-item">
                    Registrar
                  </Link>
                </li>
                <li>
                  <Link to="/listarMusicas" className="dropdown-item">
                    Listar
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <div className="nav-link" onClick={() => toggleDropdown('genero')}>Generos</div>
              <ul className={`dropdown-menu ${dropdownOpen.genero ? 'show' : ''}`}>
                <li>
                  <Link to="/registrarGenero" className="dropdown-item">
                    Registrar
                  </Link>
                </li>
                <li>
                  <Link to="/listarGeneros" className="dropdown-item">
                    Listar
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <div className="nav-link" onClick={() => toggleDropdown('pessoas')}>Pessoas</div>
              <ul className={`dropdown-menu ${dropdownOpen.pessoas ? 'show' : ''}`}>
                <li>
                  <Link to="/registrarPessoas" className="dropdown-item">
                    Registrar
                  </Link>
                </li>
                <li>
                  <Link to="/listarPessoas" className="dropdown-item">
                    Listar
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <div className="nav-link" onClick={() => toggleDropdown('usuarios')}>Usuario</div>
              <ul className={`dropdown-menu ${dropdownOpen.usuarios ? 'show' : ''}`}>
                <li>
                  <Link to="/registrarUsuario" className="dropdown-item">
                    Registrar
                  </Link>
                </li>
                <li>
                  <Link to="/listarUsuario" className="dropdown-item">
                    Listar
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item mt-auto">
              <Logout/>
            </li>
          </ul>
        </div>
      </>
    ) : null
  );
}
