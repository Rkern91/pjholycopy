import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom';
import PessoaService from "@/services/PessoaService";
import AuthContext from "@/components/authContext";

const Registrar = () => {
    const { itemId } = useParams();
    const [itemData, setItemData] = useState<any>(null);
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        nm_pessoa: '',
        ds_email: ''
    });

    useEffect(() => {
        if (itemId) {
            PessoaService.getPessoa(itemId, token).then((data: any) => {
                setItemData(data);
                setFormData({
                    nm_pessoa: data.nm_pessoa || '',
                    ds_email: data.ds_email || '',
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

        PessoaService.updatePessoa(itemId, formData, token).then((data) => {
            if (data === 200) {
                alert('Usuário atualizado!');
                navigate('/listarPessoas');
            }

            setFormData({
                nm_pessoa: '',
                ds_email: ''
            });
        }).catch((error: { data: any; }) => {
            alert('Erro ao atualizar o usuário:' + error);
        });
    };

    if (!itemData) {
        return <h4>Carregando</h4>;
    }

    return (
      <div className="formulario">
          <h2>Atualizar Pessoa</h2>
          <Form onSubmit={handleSubmit} className="formulario">
              <Row>
                  <Col>
                      <Form.Group className="mb-3">
                          <Form.Label>Nome</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Nome"
                            pattern="^[a-zA-Z ]+$"
                            id="nm_pessoa"
                            name="nm_pessoa"
                            value={formData.nm_pessoa}
                            onChange={handleChange}
                            required={true}
                          />
                      </Form.Group>
                  </Col>
                  <Col>
                      <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="text"
                            pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
                            placeholder="Email"
                            id="ds_email"
                            name="ds_email"
                            value={formData.ds_email}
                            onChange={handleChange}
                            required={true}
                            title={"Formato padrão: xxxxx@xxxx.xxx"}
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
