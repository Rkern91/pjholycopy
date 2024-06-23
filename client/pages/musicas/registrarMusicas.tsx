import React, {useContext, useEffect, useState} from 'react'
import Button                                   from 'react-bootstrap/Button'
import Form                                     from 'react-bootstrap/Form'
import Row                                      from 'react-bootstrap/Row';
import Col                                      from 'react-bootstrap/Col';
import {useNavigate}                            from 'react-router-dom'
import MusicaService                            from "@/services/MusicaService";
import PessoaService                            from "@/services/PessoaService";
import GeneroMusicaService                      from "@/services/GeneroMusicaService";
import AuthContext                              from "@/components/authContext";

const formataDuracao = (value: string) => {
    const cleanedValue = value.replace(/[^0-9]/g, '');

    let formattedValue = cleanedValue;
    if (cleanedValue.length > 2) {
        formattedValue = cleanedValue.slice(0, 2) + ':' + cleanedValue.slice(2);
    }
    if (cleanedValue.length > 4) {
        formattedValue = formattedValue.slice(0, 5) + ':' + cleanedValue.slice(4, 6);
    }
    if (cleanedValue.length > 6) {
        formattedValue = formattedValue.slice(0, 8) + ':' + cleanedValue.slice(6, 8);
    }
    return formattedValue;
};

const RegistrarMusicas = () => {
    const navigate = useNavigate()
    const { token } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        cd_autor: '',
        cd_genero: '',
        nm_musica: '',
        ds_duracao: '',
        ds_descricao: '',
        nm_album: '',
        ds_link_cifra: '',
        ds_link_video: '',
        ds_link_letra: ''
    });

    const [autores, setAutores] = useState([]);
    const [generos, setGeneros] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const autoresData = await PessoaService.getPessoas(token);
            const generosData = await GeneroMusicaService.getGeneroMusicas(token);

            setAutores(autoresData);
            setGeneros(generosData);
        };

        fetchData();
    }, [token]);

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;

        if (name === 'ds_duracao')
            setFormData({ ...formData, [event.target.name]: formataDuracao(event.target.value) })
        else
            setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        try
        {
            const response = await MusicaService.createMusica(formData, token);

            if (response === 201)
                alert('Musica cadastrada com sucesso!');

            setFormData({
                cd_autor: '',
                cd_genero: '',
                nm_musica: '',
                ds_duracao: '',
                ds_descricao: '',
                nm_album: '',
                ds_link_cifra: '',
                ds_link_video: '',
                ds_link_letra: ''
            });
        }
        catch (error)
        {
            alert(error);
        }
    };

    return (
      <div className={"formulario"}>
          <h2>Nova Música</h2>
          <Form onSubmit={handleSubmit}>
              <Row>
                  <Col>
                      <Form.Group className="mb-3">
                          <Form.Label>Autor</Form.Label>
                          <Form.Control
                            as="select"
                            id="cd_autor"
                            name="cd_autor"
                            value={formData.cd_autor}
                            onChange={handleChange}
                            required={true}
                          >
                              <option value="">Selecione um autor</option>
                              {autores.map((autor) => (
                                <option key={autor["cd_pessoa"]} value={autor["cd_pessoa"]}>
                                    {autor["nm_pessoa"]}
                                </option>
                              ))}
                          </Form.Control>
                      </Form.Group>
                  </Col>
                  <Col>
                      <Form.Group className="mb-3">
                          <Form.Label>Gênero</Form.Label>
                          <Form.Control
                            as="select"
                            id="cd_genero"
                            name="cd_genero"
                            value={formData.cd_genero}
                            onChange={handleChange}
                            required={true}
                          >
                              <option value="">Selecione um gênero</option>
                              {generos.map((genero) => (
                                <option key={genero["cd_genero"]} value={genero["cd_genero"]}>
                                    {genero["ds_genero"]}
                                </option>
                              ))}
                          </Form.Control>
                      </Form.Group>
                  </Col>
              </Row>
              <Row>
                  <Col>
                      <Form.Group className="mb-3">
                          <Form.Label>Nome da Música</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Nome da Música"
                            id="nm_musica"
                            name="nm_musica"
                            value={formData.nm_musica}
                            onChange={handleChange}
                            required={true}
                          />
                      </Form.Group>
                  </Col>
                  <Col>
                      <Form.Group className="mb-3">
                          <Form.Label>Duração</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Duração"
                            id="ds_duracao"
                            name="ds_duracao"
                            value={formData.ds_duracao}
                            onChange={handleChange}
                            pattern="^\d{2}:\d{2}:\d{2}$"
                            title="Formato esperado: HH:MM:SS"
                            required={true}
                          />
                      </Form.Group>
                  </Col>
              </Row>
              <Form.Group className="mb-3">
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Descrição"
                    id="ds_descricao"
                    name="ds_descricao"
                    value={formData.ds_descricao}
                    onChange={handleChange}
                    required={true}
                  />
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Álbum</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Álbum"
                    id="nm_album"
                    name="nm_album"
                    value={formData.nm_album}
                    onChange={handleChange}
                    required={true}
                  />
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Link para Cifra</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Link para Cifra"
                    id="ds_link_cifra"
                    name="ds_link_cifra"
                    value={formData.ds_link_cifra}
                    onChange={handleChange}
                  />
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Link para Vídeo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Link para Vídeo"
                    id="ds_link_video"
                    name="ds_link_video"
                    value={formData.ds_link_video}
                    onChange={handleChange}
                  />
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Link para Letra</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Link para Letra"
                    id="ds_link_letra"
                    name="ds_link_letra"
                    value={formData.ds_link_letra}
                    onChange={handleChange}
                  />
              </Form.Group>
              <Row>
                  <Col className="buttons">
                      <Button type="submit">Registrar</Button>
                      <Button onClick={() => navigate('/listarMusicas')}>Listagem de Músicas</Button>
                  </Col>
              </Row>
          </Form>
      </div>
    );
};

export default RegistrarMusicas;
