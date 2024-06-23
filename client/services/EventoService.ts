import axios from 'axios'

const baseUrl = 'http://localhost:3001/evento'

class EventoService {
  async createEvento(data: any, token: any) {
    return await axios.post(baseUrl, data, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => response.status).catch((error) => {
      throw (error.response.data.message);
    });
  }

  async getEvento(cd_evento: any, token: any) {
    return await axios.get(`${baseUrl}/${cd_evento}`, {
      headers: {Authorization: `Bearer ${token}`}
    }).then((response) => response.data).catch((error) => {
      throw (error.response.data.message);
    });
  }

  async getEventos(token: string | null) {
    return await axios.get(`${baseUrl}`, {
      headers: {Authorization: `Bearer ${token}`}
    }).then((response) => response.data).catch((error) => {
      throw (error.response.data.message);
    });
  }

  async updateEvento(cd_evento: any, data: any, token: any) {
    return await axios.put(`${baseUrl}/${cd_evento}`, data, {
      headers: {Authorization: `Bearer ${token}`}
    }).then((response) => response.status).catch((error) => {
      throw (error.response.data.message);
    });
  }

  async deleteEvento(cd_evento: any, token: any) {
      return await axios.delete(`${baseUrl}/${cd_evento}`, {
        headers: {Authorization: `Bearer ${token}`}
      }).then((response) => response.status).catch((error) => {
        // @ts-ignore
        throw (error.response.data.message);
      });
  }
}

export default new EventoService()