import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom';
import GeneroMusicaService from "@/services/GeneroMusicaService";
import AuthContext from "@/components/authContext";

const Registrar = () => {
    const { itemId } = useParams();
    const [itemData, setItemData] = useState<any>(null);
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        ds_genero: ''
    });

    useEffect(() => {
        if (itemId) {
            GeneroMusicaService.getGeneroMusica(itemId, token).then((data: any) => {
                setItemData(data);
                setFormData({
                    ds_genero: data.ds_genero || ''
                });
            }).catch((error) => {
                alert(error);
            });
        }
    }, [itemId, token]);

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault(); // Prevent default form submission

        GeneroMusicaService.updateGeneroMusica(itemId, formData, token).then((data) => {
            if (data === 200) {
                alert('Genero Musica atualizado!');
                navigate('/listarGeneros');
            }

            setFormData({
                ds_genero: ''
            });
        }).catch((error: { data: any; }) => {
            alert(error);

            setFormData({
                ds_genero: ''
            });
        });
    };

    if (!itemData) {
        return <h4>Carregando</h4>;
    }

    return (
      <div className="formulario">
          <h2>Atualizar Genero Musica</h2>
          <Form onSubmit={handleSubmit} className="formulario">
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
                  <Col className="buttons">
                      <Button type="submit">Atualizar</Button>
                      <Button onClick={() => navigate('/listarGeneros')}>Voltar p/ Lista</Button>
                  </Col>
              </Row>
          </Form>
      </div>
    );
};

export default Registrar;
