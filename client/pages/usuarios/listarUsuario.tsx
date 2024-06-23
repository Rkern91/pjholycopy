import React, {useState, useEffect, useContext} from 'react'
import Table                                    from 'react-bootstrap/Table'
import Button                                   from 'react-bootstrap/Button'
import {FaEdit, FaTrash}                        from 'react-icons/fa'
import {useNavigate}                            from 'react-router-dom'
import UsuarioService                           from '@/services/usuarioService';
import AuthContext                              from '@/components/authContext';
import Pagination                               from '@/components/pagination';

const ListarUsuarios = () => {
  const navigate                      = useNavigate()
  const {token}                       = useContext(AuthContext)
  const [usuarios,    setUsuarios]    = useState<any>(null)
  const [error,       setError]       = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages,  setTotalPages]  = useState(1);
  const itemsPerPage                  = 10;

  useEffect(() => {
    UsuarioService.getUsuarios(token).then((data) => {
      setUsuarios(data)
      // setTotalPages(data.totalPages)
    }).catch((error) => {
      console.error('Erro ao listar usuários:', error)
      setError(error)
    })
  }, [currentPage])

  const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  }

  const handleRemove = async (cd_usuario: any) => {
    UsuarioService.deleteUsuario(cd_usuario, token).then((data) => {
      if (data == 200)
      {
        alert('Usuário removido!');
        setUsuarios(usuarios.filter((usuario: { cd_usuario: any }) => usuario.cd_usuario !== cd_usuario));
      }
    })
    .catch((error) => {
      alert(error);
    });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!usuarios) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Lista de Usuários</h3>
      <Table responsive='sm'>
        <thead>
        <tr>
          <th>Nome</th>
          <th>Dt. Ultimo Acesso</th>
          <th>Ações</th>
        </tr>
        </thead>
        <tbody>
        {usuarios.map((usuario: any) => (
          <tr key={usuario.cd_pessoa}>
            <td>{usuario.ds_username}</td>
            <td>{new Date(usuario.dt_ultimo_acesso).toLocaleDateString()}</td>
            <td>
              <Button onClick={() => navigate(`/atualizarUsuario/${usuario.cd_pessoa}`)}>
                <FaEdit/>
              </Button>
              <Button onClick={() => handleRemove(usuario.cd_pessoa)}>
                <FaTrash/>
              </Button>
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
    </div>
  )
}

export default ListarUsuarios