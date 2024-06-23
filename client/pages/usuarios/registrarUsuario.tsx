import React, {useContext, useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useNavigate} from 'react-router-dom'
import UsuarioService from '@/services/usuarioService';
import PessoaService from '@/services/PessoaService';
import AuthContext from '@/components/authContext';

const Registrar  = () => {
  const navigate = useNavigate()
  const {token}  = useContext(AuthContext)
  const [formData, setFormData] = useState({
    ds_username: '',
    ds_password: '',
    cd_pessoa:   ''
  })

  const [pessoas, setPessoas] = useState([]);

  useEffect(() => {
    const fetchPessoas = async () => {
      await PessoaService.getPessoas(token).then((pessoaResponse) => {
        setPessoas(pessoaResponse);
      });
    };

    fetchPessoas();
  }, [token]);

  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    setFormData({...formData, [event.target.name]: event.target.value})
  }

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    UsuarioService.createUsuario(formData.cd_pessoa, formData, token).then((response) => {
      if (response === 201)
        alert('Usuario cadastrado com sucesso!');

      setFormData({
        ds_username: '',
        ds_password: '',
        cd_pessoa:   ''
      })

    }).catch((error: { data: any; }) => {
      alert(error);
    })
  };

  return (
    <div className={'formulario'}>
      <h2>Novo Usuario</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3'>
          <Form.Label>Nome</Form.Label>
          <Form.Control
            as='select'
            id='cd_pessoa'
            name='cd_pessoa'
            value={formData.cd_pessoa}
            onChange={handleChange}
            required={true}>
            <option value=''>Selecione uma pessoa</option>
            {pessoas.map((pessoa) => (
              <option key={pessoa['cd_pessoa']} value={pessoa['cd_pessoa']}>
                {pessoa['nm_pessoa']}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label>Usuário</Form.Label>
              <Form.Control
                type='text'
                placeholder='usuário'
                id='ds_username'
                name='ds_username'
                value={formData.ds_username}
                onChange={handleChange}
                required={true}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type='password'
                placeholder='senha'
                id='ds_password'
                name='ds_password'
                value={formData.ds_password}
                onChange={handleChange}
                required={true}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className='buttons'>
            <Button type='submit'>Registrar</Button>
            <Button onClick={() => navigate('/listarUsuario')}>Voltar p/ Lista</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Registrar;
