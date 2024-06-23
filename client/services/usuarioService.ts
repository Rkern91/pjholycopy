import axios from 'axios'

const baseUrl = 'http://localhost:3001/usuario'

class UsuarioService {

  async createUsuario(cd_usuario: any, data: any, token: any) {
    return await axios.post(`${baseUrl}/${cd_usuario}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => response.status).catch((error) => {
      throw error.response.data.message;
    });
  }

  async getUsuario(cd_usuario: any, token: any) {
    return await axios.get(`${baseUrl}/${cd_usuario}`, {
      headers: {Authorization: `Bearer ${token}`}
    }).then((response) => response.data).catch((error) => {
      throw (error.response.data.message);
    });
  }

  async getUsuarios(token: string | null) {
    return await axios.get(`${baseUrl}`, {
      headers: {Authorization: `Bearer ${token}`}
    }).then((response) => response.data).catch((error) => {
      console.error('Error fetching data:', error)
    })
  }

  async updateUsuario(cd_usuario: any, data: any, token: any) {
    return await axios.put(`${baseUrl}/${cd_usuario}`, data, {
      headers: {Authorization: `Bearer ${token}`}
    }).then((response) => response.status).catch((error) => {
      throw (error.response.data.message);
    });
  }

  async deleteUsuario(cd_usuario: any, token: any) {
    return await axios.delete(`${baseUrl}/${cd_usuario}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => response.status)
    .catch((error) => {
      throw error.response.data.message;
    });
  }
}

export default new UsuarioService()