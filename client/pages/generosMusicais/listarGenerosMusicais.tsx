import React, {useState, useEffect, useContext} from 'react'
import Table                                    from 'react-bootstrap/Table'
import Button                                   from 'react-bootstrap/Button'
import {FaEdit, FaTrash}                        from 'react-icons/fa'
import {useNavigate}                            from 'react-router-dom'
import GeneroMusicaService                      from '@/services/GeneroMusicaService';
import AuthContext                              from '@/components/authContext';
import Pagination                               from '@/components/pagination';

const ListarGenerosMusicais = () => {
  const navigate                      = useNavigate()
  const {token}                       = useContext(AuthContext)
  const [generos,    setGeneros]      = useState<any>(null)
  const [error,       setError]       = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages,  setTotalPages]  = useState(1);
  const itemsPerPage                  = 10;

  useEffect(() => {
    GeneroMusicaService.getGeneroMusicas(token).then((data) => {
      setGeneros(data)
      // setTotalPages(data.totalPages)
    }).catch((error) => {
      alert(error)
    })
  }, [currentPage])

  const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  }

  const handleRemove = async (cd_genero: any) => {
    GeneroMusicaService.deleteGeneroMusica(cd_genero, token).then((data) => {
      if (data === 200)
      {
        alert('Genero removido!');
        setGeneros(generos.filter((genero: { cd_genero: any }) => genero.cd_genero !== cd_genero))
      }
    }).catch((error) => {
      alert(error);
    })
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!generos) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Lista de Generos Musicais</h3>
      <Table responsive='sm'>
        <thead>
        <tr>
          <th>Genero</th>
          <th>Ações</th>
        </tr>
        </thead>
        <tbody>
        {generos.map((genero: any) => (
          <tr key={genero.cd_genero}>
            <td>{genero.ds_genero}</td>
            <td>
              <Button onClick={() => navigate(`/atualizarGenero/${genero.cd_genero}`)}>
                <FaEdit/>
              </Button>
              <Button onClick={() => handleRemove(genero.cd_genero)}>
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

export default ListarGenerosMusicais