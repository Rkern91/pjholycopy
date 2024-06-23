import React, { useState, useEffect, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {FaBook, FaEdit, FaTrash} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import EventoService from '@/services/EventoService';
import AuthContext from '@/components/authContext';
import Pagination from '@/components/pagination';

const ListarEventos = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [eventos, setEventos] = useState<any>(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    EventoService.getEventos(token).then((data) => {
      setEventos(data);
      // setTotalPages(data.totalPages)
    }).catch((error) => {
      alert(error);
    });
  }, [currentPage]);

  const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  const handleRemove = async (cd_evento: any) => {
    EventoService.deleteEvento(cd_evento, token).then((data) => {
      if (data === 200) {
        alert('Evento removido!');
        setEventos(eventos.filter((evento: { cd_evento: any }) => evento.cd_evento !== cd_evento));
      }
    }).catch((error) => {
      alert(error);
    });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!eventos) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Lista de Eventos</h3>
      <Table responsive='sm'>
        <thead>
        <tr>
          <th>Nome</th>
          <th>Usuário Responsável</th>
          <th>Data do Evento</th>
          <th>Ações</th>
        </tr>
        </thead>
        <tbody>
        {eventos.map((evento: any) => (
          <tr key={evento.cd_evento}>
            <td>{evento.ds_evento}</td>
            <td>{evento.responsavel.ds_username}</td>
            <td>{new Date(evento.dt_evento).toLocaleDateString()}</td>
            <td>
              <Button onClick={() => navigate(`/detalharEvento/${evento.cd_evento}`)}>
                <FaBook />
              </Button>
              <Button onClick={() => navigate(`/atualizarEventos/${evento.cd_evento}`)}>
                <FaEdit />
              </Button>
              <Button onClick={() => handleRemove(evento.cd_evento)}>
                <FaTrash />
              </Button>
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
      {/* Paginação se necessário */}
      {/* <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      /> */}
    </div>
  );
};

export default ListarEventos;
