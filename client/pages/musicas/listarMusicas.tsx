import React, {useState, useEffect, useContext} from 'react'
import Table                                    from 'react-bootstrap/Table'
import Button                                   from 'react-bootstrap/Button'
import {FaEdit, FaTrash}                        from 'react-icons/fa'
import {useNavigate}                            from 'react-router-dom'
import MusicaService                            from '@/services/MusicaService';
import AuthContext                              from '@/components/authContext';
import Pagination                               from '@/components/pagination';

const ListarMusicas = () => {
  const navigate                      = useNavigate()
  const {token}                       = useContext(AuthContext)
  const [musica,    setMusicas]     = useState<any>(null)
  const [error,       setError]       = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages,  setTotalPages]  = useState(1);
  const itemsPerPage                  = 10;

  useEffect(() => {
    MusicaService.getMusicas(token).then((data) => {
      setMusicas(data)
      // setTotalPages(data.totalPages)
    }).catch((error) => {
      console.error('Erro ao listar musica:', error)
      setError(error)
    })
  }, [currentPage])

  const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  }

  const handleRemove = async (cd_musica: any) => {
    MusicaService.deleteMusica(cd_musica, token).then((data) => {
      if (data === 200)
      {
        alert('Musica removida!');
        setMusicas(musica.filter((musica: { cd_musica: any }) => musica.cd_musica !== cd_musica))
      }
    }).catch((error) => {
      alert(error);
    })
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!musica) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Lista de Musica</h3>
      <Table responsive='sm'>
        <thead>
        <tr>
          <th>Nome</th>
          <th>Album</th>
          <th>Duração</th>
          <th>Ações</th>
        </tr>
        </thead>
        <tbody>
        {musica.map((musica: any) => (
          <tr key={musica.cd_musica}>
            <td>{musica.nm_musica}</td>
            <td>{musica.nm_album}</td>
            <td>{musica.ds_duracao}</td>
            <td>
              <Button onClick={() => navigate(`/atualizarMusicas/${musica.cd_musica}`)}>
                <FaEdit/>
              </Button>
              <Button onClick={() => handleRemove(musica.cd_musica)}>
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

export default ListarMusicas