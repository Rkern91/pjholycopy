import React, {useContext, useState} from 'react'
import Button                        from 'react-bootstrap/Button'
import Form                          from 'react-bootstrap/Form'
import Row                           from 'react-bootstrap/Row'
import Col                           from 'react-bootstrap/Col'
import AuthContext                   from "@/components/authContext"
import axios                         from "axios"
import styles                        from "../styles/login.module.css"
import {useNavigate}                 from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css"

const Login = () => {
    const navigate = useNavigate()
    const baseUrl = 'http://localhost:3001/login'
    const [formData, setFormData] = useState({
        ds_username: '',
        ds_password: ''
    })

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const [error, setError] = useState(null);
    const { setIsAuthenticated, setToken } = useContext(AuthContext);

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()

        try {
            const response = await axios.post(`${baseUrl}`, { ds_username: formData.ds_username, ds_password: formData.ds_password }); // Replace with your API endpoint
            const { token } = response.data

            localStorage.setItem('jwtToken', token)
            setIsAuthenticated(true)
            setToken(token)

            navigate('/')
        } catch (error: any) {
            setError(error.response?.data?.message || 'Usuario ou senha incorretos')
        }
    };


    return (
        <div className={styles.container}>
            <div className={styles.formulario}>
                <h2>Login</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Usuário</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="usuário"
                            id="ds_username"
                            name="ds_username"
                            value={formData.ds_username}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="senha"
                            id="ds_password"
                            name="ds_password"
                            value={formData.ds_password}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Row>
                        {error && <p className="error-message alert-danger">{error}</p>}
                    </Row>
                    <Row>
                        <Col className={styles.buttons}>
                            <Button type="submit">Login</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
};

export default Login;