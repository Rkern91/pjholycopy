import React, {useContext, useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useNavigate} from 'react-router-dom'
import PessoaService from "@/services/PessoaService";
import AuthContext from "@/components/authContext";

const Registrar = () => {
    const navigate = useNavigate()
    const { token } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        nm_pessoa: '',
        ds_email: ''
    })

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        PessoaService.createPessoa(formData, token).then((response) => {
            if (response === 201)
                alert('Pessoa cadastrado com sucesso!');

            setFormData({
                nm_pessoa: '',
                ds_email: ''
            })

        }).catch( (error: { data: any; }) => {
            alert(error);

            setFormData({
                nm_pessoa: '',
                ds_email: ''
            })
        })
    };

    return (
      <div className={"formulario"}>
          <h2>Nova Pessoa</h2>
          <Form onSubmit={handleSubmit}>
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
                      <Button type="submit">Registrar</Button>
                      <Button onClick={() => navigate('/listarPessoas')}>Listagem Pessoas</Button>
                  </Col>
              </Row>
          </Form>
      </div>
    );
};

export default Registrar;
