import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate }                 from 'react-router-dom';
import Button                                     from 'react-bootstrap/Button';
import Table                                      from 'react-bootstrap/Table';
import EventoService                              from '@/services/EventoService';
import AuthContext                                from '@/components/authContext';
import Modal from 'react-bootstrap/Modal';

const DetalharEvento = () => {
  const { itemId }                = useParams();
  const navigate                  = useNavigate();
  const { token }                 = useContext(AuthContext);
  const [iframeUrl, setIframeUrl] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [evento, setEvento]       = useState({
    ds_evento: '',
    dt_evento: ''
  });
  const [musicas,  setMusicas]  = useState([]);
  const [usuarios, setUsuarios] = useState({
    ds_username: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try
      {
        await EventoService.getEvento(itemId, token).then((eventoResponse) => {
          setEvento({
            ds_evento: eventoResponse.ds_evento,
            dt_evento: eventoResponse.dt_evento.split('T')[0],
          });

          setMusicas(eventoResponse.musicas);

          setUsuarios({
            ds_username: eventoResponse.responsavel.ds_username
          });
        });
      }
      catch (error)
      {
        alert(error);
      }
    };

    fetchData();
  }, [itemId, token]);

  const handleIframeClick = (url: React.SetStateAction<string>) => {
    setIframeUrl(url);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setIframeUrl('');
  };

  if (!evento) {
    return <div>Loading...</div>;
  }

  return (
    <div className='detalhamento'>
      <h2>Detalhamento do Evento</h2>
      <div>
        <strong>Nome do Evento:</strong> {evento['ds_evento']}
      </div>
      <div>
        <strong>Dt. Evento:</strong> {evento['dt_evento']}
      </div>
      <div>
        <strong>Responsável:</strong> {usuarios['ds_username']}
      </div>
      <Table responsive='sm' className='mt-3'>
        <thead>
        <tr>
          <th>Nome da Música</th>
          <th>Link do Vídeo</th>
          <th>Link da Cifra</th>
          <th>Link da Música</th>
        </tr>
        </thead>
        <tbody>
        {musicas.map((musica) => (
          <React.Fragment key={musica['cd_musica']}>
            <tr>
              <td>{musica['nm_musica']}</td>
              <td>
                {musica['ds_link_video'] ? (
                  <Button variant='link' onClick={() => handleIframeClick(musica['ds_link_video'])}>
                    Vídeo
                  </Button>
                ) : (
                  <span>Sem vídeo</span>
                )}
              </td>
              <td>
                {musica['ds_link_cifra'] ? (
                  <Button variant='link' onClick={() => handleIframeClick(musica['ds_link_cifra'])}>
                    Cifra
                  </Button>
                ) : (
                  <span>Sem cifra</span>
                )}
              </td>
              <td>
                {musica['ds_link_letra'] ? (
                  <Button variant='link' onClick={() => handleIframeClick(musica['ds_link_letra'])}>
                    Música
                  </Button>
                ) : (
                  <span>Sem música</span>
                )}
              </td>
            </tr>
          </React.Fragment>
        ))}
        </tbody>
      </Table>

      <Button onClick={() => navigate('/')}>Voltar p/ Lista</Button>

      <Modal show={showModal} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Visualização</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {iframeUrl && (
            <iframe src={iframeUrl} title='iframe' width='100%' height='500px' frameBorder='0' />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DetalharEvento;
