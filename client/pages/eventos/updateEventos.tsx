import React, {useContext, useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EventoService from '@/services/EventoService';
import MusicaService from '@/services/MusicaService';
import UsuarioService from '@/services/usuarioService';
import AuthContext from '@/components/authContext';
import Table from "react-bootstrap/Table";

const AtualizarEventos = () => {
  const {itemId}                = useParams();
  const navigate                = useNavigate();
  const {token}                 = useContext(AuthContext);
  const [formData, setFormData] = useState({
    ds_evento:              '',
    cd_usuario_responsavel: '',
    dt_evento:              ''
  });

  const [musicasSelecionadas, setMusicasSelecionadas] = useState([]);
  const [allMusicas,          setAllMusicas]          = useState([]);
  const [usuarios,            setUsuarios]            = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try
      {
        await EventoService.getEvento(itemId, token).then((eventoResponse) => {
          setFormData({
            ds_evento:              eventoResponse.ds_evento,
            cd_usuario_responsavel: eventoResponse.cd_usuario_responsavel,
            dt_evento:              eventoResponse.dt_evento.split('T')[0],
          });

          setMusicasSelecionadas(eventoResponse.musicas);
        });

        await MusicaService.getMusicas(token).then((musicaResponse) => {
          setAllMusicas(musicaResponse);
        })

        await UsuarioService.getUsuarios(token).then((usuariosResponse) => {
          setUsuarios(usuariosResponse);
        });
      }
      catch (error)
      {
        alert(error);
      }
    };

    fetchData();
  }, [itemId, token]);

  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    setFormData({...formData, [event.target.name]: event.target.value});
  };

  const handleSelectMusica = (event: { target: { value: string; }; }) => {
    const selectedMusica = allMusicas.find(musica => musica['cd_musica'] === parseInt(event.target.value));

    if (selectedMusica && !musicasSelecionadas.some(m => m['cd_musica'] === selectedMusica['cd_musica']))
      setMusicasSelecionadas([...musicasSelecionadas, selectedMusica]);
  };

  const handleRemoveMusica = (musica: never) => {
    setMusicasSelecionadas(musicasSelecionadas.filter(m => m['cd_musica'] !== musica['cd_musica']));
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const musicasIds = musicasSelecionadas.map(musica => musica['cd_musica']);
    const eventoData = {
      evento: formData,
      musicas: {arr_musicas_evento: `{${musicasIds.join(',')}}`}
    };

    try {
      const response = await EventoService.updateEvento(itemId, eventoData, token);

      if (response === 200) {
        alert('Evento atualizado com sucesso!');
        navigate('/');
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className='formulario'>
      <h2>Atualizar Evento</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3'>
          <Form.Label>Descrição do Evento</Form.Label>
          <Form.Control
            type='text'
            placeholder='Descrição do Evento'
            id='ds_evento'
            name='ds_evento'
            value={formData.ds_evento}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label>Responsável (ID)</Form.Label>
              <Form.Control
                as='select'
                placeholder='ID do Usuário Responsável'
                id='cd_usuario_responsavel'
                name='cd_usuario_responsavel'
                value={formData.cd_usuario_responsavel}
                onChange={handleChange}
                required>
                <option value=''>Selecione um responsavel</option>
                {usuarios.map((usuario) => (
                  <option key={usuario['cd_pessoa']} value={usuario['cd_pessoa']}>
                    {usuario['ds_username']}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label>Data do Evento</Form.Label>
              <Form.Control
                type='date'
                id='dt_evento'
                name='dt_evento'
                value={formData.dt_evento}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className='mb-3'>
          <Form.Label>Adicionar Músicas</Form.Label>
          <Form.Control as='select' onChange={handleSelectMusica}>
            <option value=''>Selecione uma música</option>
            {allMusicas.map(musica => (
              <option key={musica['cd_musica']} value={musica['cd_musica']}>
                {musica['nm_musica']}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <div>
          <h5>Músicas Selecionadas:</h5>
          <Table striped bordered hover>
            <thead>
            <tr>
              <th>Nome da Música</th>
              <th>Ações</th>
            </tr>
            </thead>
            <tbody>
            {musicasSelecionadas.map(musica => (
              <tr key={musica['cd_musica']}>
                <td>{musica['nm_musica']}</td>
                <td>
                  <Button variant='danger' onClick={() => handleRemoveMusica(musica)}>
                    Remover
                  </Button>
                </td>
              </tr>
            ))}
            </tbody>
          </Table>
        </div>
        <Row>
          <Col className='buttons'>
            <Button type='submit'>Atualizar Evento</Button>
            <Button onClick={() => navigate('/')}>Voltar p/ Lista</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AtualizarEventos;
