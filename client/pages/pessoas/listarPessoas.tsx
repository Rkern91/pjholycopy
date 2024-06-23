import React, {useState, useEffect, useContext} from 'react'
import Table                                    from 'react-bootstrap/Table'
import Button                                   from 'react-bootstrap/Button'
import {FaEdit, FaTrash}                        from 'react-icons/fa'
import {useNavigate}                            from 'react-router-dom'
import PessoaService                            from '@/services/PessoaService';
import AuthContext                              from '@/components/authContext';
import Pagination                               from '@/components/pagination';

const ListarPessoas = () => {
  const navigate                      = useNavigate()
  const {token}                       = useContext(AuthContext)
  const [pessoas,    setPessoas]     = useState<any>(null)
  const [error,       setError]       = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages,  setTotalPages]  = useState(1);
  const itemsPerPage                  = 10;

  useEffect(() => {
    PessoaService.getPessoas(token).then((data) => {
      setPessoas(data)
      // setTotalPages(data.totalPages)
    }).catch((error) => {
      console.error('Erro ao listar pessoas:', error)
      setError(error)
    })
  }, [currentPage])

  const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  }

  const handleRemove = async (cd_pessoa: any) => {
    PessoaService.deletePessoa(cd_pessoa, token).then((data) => {
      if (data === 200)
      {
        alert('Pessoa removida!');
        setPessoas(pessoas.filter((pessoa: { cd_pessoa: any }) => pessoa.cd_pessoa !== cd_pessoa))
      }
    }).catch((error) => {
      alert(error);
    })
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!pessoas) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Lista de Pessoas</h3>
      <Table responsive='sm'>
        <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Ações</th>
        </tr>
        </thead>
        <tbody>
        {pessoas.map((pessoa: any) => (
          <tr key={pessoa.cd_pessoa}>
            <td>{pessoa.nm_pessoa}</td>
            <td>{pessoa.ds_email}</td>
            <td>
              <Button onClick={() => navigate(`/atualizarPessoas/${pessoa.cd_pessoa}`)}>
                <FaEdit/>
              </Button>
              <Button onClick={() => handleRemove(pessoa.cd_pessoa)}>
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

export default ListarPessoas