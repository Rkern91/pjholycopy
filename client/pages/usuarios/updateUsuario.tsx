import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom';
import UsuarioService from "@/services/usuarioService";
import AuthContext from "@/components/authContext";

const Registrar = () => {
    const { itemId } = useParams();
    const [itemData, setItemData] = useState<any>(null);
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        ds_username: '',
        ds_password: '',
    });

    useEffect(() => {
        if (itemId) {
            UsuarioService.getUsuario(itemId, token).then((data: any) => {
                setItemData(data);
                setFormData({
                    ds_username: data.ds_username || '',
                    ds_password: '',
                });
            }).catch((error) => {
                console.error("Erro ao carregar os dados do usuário:", error);
            });
        }
    }, [itemId, token]);

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault(); // Prevent default form submission

        UsuarioService.updateUsuario(itemId, formData, token).then((data) => {
            if (data === 200) {
                alert('Usuário atualizado!');
                navigate('/listarUsuario');
            }

            setFormData({
                ds_username: '',
                ds_password: '',
            });
        }).catch((error: { data: any; }) => {
            alert('Erro ao atualizar o usuário: ' + error);
        });
    };

    if (!itemData) {
        return <h4>Carregando</h4>;
    }

    return (
      <div className="formulario">
          <h2>Atualizar Usuario</h2>
          <Form onSubmit={handleSubmit} className="formulario">
              <Row>
                  <Col>
                      <Form.Group className="mb-3">
                          <Form.Label>Usuário</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Usuário"
                            id="ds_username"
                            name="ds_username"
                            value={formData.ds_username}
                            onChange={handleChange}
                            required={true}
                          />
                      </Form.Group>
                  </Col>
                  <Col>
                      <Form.Group className="mb-3">
                          <Form.Label>Senha</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Senha"
                            id="ds_password"
                            name="ds_password"
                            required={true}
                            value={formData.ds_password}
                            onChange={handleChange}
                          />
                      </Form.Group>
                  </Col>
              </Row>
              <Row>
                  <Col className="buttons">
                      <Button type="submit">Atualizar</Button>
                      <Button onClick={() => navigate('/listarUsuario')}>Voltar p/ Lista</Button>
                  </Col>
              </Row>
          </Form>
      </div>
    );
};

export default Registrar;
