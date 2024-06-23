import React, {useContext, useEffect, useState} from 'react'
import Button                                   from 'react-bootstrap/Button'
import Form                                     from 'react-bootstrap/Form'
import Row                                      from 'react-bootstrap/Row';
import Col                                      from 'react-bootstrap/Col';
import {useNavigate}                            from 'react-router-dom'
import GeneroMusicaService                      from '@/services/GeneroMusicaService';
import AuthContext                              from '@/components/authContext';

const RegistrarGeneroMusicas = () => {
    const navigate                = useNavigate();
    const { token }               = useContext(AuthContext);
    const [formData, setFormData] = useState({
        ds_genero: ''
    });

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        GeneroMusicaService.createGeneroMusica(formData, token).then((response) => {
            if (response === 201)
                alert('Genero cadastrado com sucesso!');

            setFormData({
                ds_genero: ''
            })

        }).catch((error: { data: any; }) => {
            alert(error);

            setFormData({
                ds_genero: ''
            });
        });
    };

    return (
      <div className={'formulario'}>
          <h2>Novo Genero Musica</h2>
          <Form onSubmit={handleSubmit}>
              <Form.Group className='mb-3'>
                  <Form.Label>Genero</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Genero'
                    pattern='^[a-zA-Z ]+$'
                    id='ds_genero'
                    name='ds_genero'
                    value={formData.ds_genero}
                    onChange={handleChange}
                    title="Informe uma descrição do Gênero musical"
                    required={true}
                  />
              </Form.Group>
              <Row>
                  <Col className='buttons'>
                      <Button type='submit'>Registrar</Button>
                      <Button onClick={() => navigate('/listarGeneros')}>Voltar p/ Lista</Button>
                  </Col>
              </Row>
          </Form>
      </div>
    );
};

export default RegistrarGeneroMusicas;
