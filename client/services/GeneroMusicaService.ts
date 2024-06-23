import axios from 'axios'

const baseUrl = 'http://localhost:3001/genero'

class GeneroMusicaService {
  async createGeneroMusica(data: any, token: any) {
      return await axios.post(baseUrl, data, {
        headers: { Authorization: `Bearer ${token}` }
      }).then((response) => response.status).catch((error) => {
        // @ts-ignore
        throw (error.response.data.message);
      });
  }

  async getGeneroMusica(cd_genero: any, token: any) {
    try
    {
      let response = await axios.get(`${baseUrl}/${cd_genero}`, {
        headers: {Authorization: `Bearer ${token}`}
      });

      return await response.data;
    }
    catch (error)
    {
      console.error('Error fetching data:', error)
      ;
    }
  }

  async getGeneroMusicas(token: string | null) {
    return await axios.get(`${baseUrl}`, {
      headers: {Authorization: `Bearer ${token}`}
    }).then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching data:', error)
    })
  }

  async updateGeneroMusica(cd_genero: any, data: any, token: any) {
    try
    {
      return await axios.put(`${baseUrl}/${cd_genero}`, data, {
        headers: {Authorization: `Bearer ${token}`}
      }).then((response) => response.status).catch((error) => {
        // @ts-ignore
        throw (error.response.data.message);
      });
    }
    catch (error)
    {
      console.error('Error fetching data:', error);
    }
  }

  async deleteGeneroMusica(cd_genero: any, token: any) {
      return await axios.delete(`${baseUrl}/${cd_genero}`, {
        headers: {Authorization: `Bearer ${token}`}
      }).then((response) => response.status).catch((error) => {
        // @ts-ignore
        throw (error.response.data.message);
      });
  }
}

export default new GeneroMusicaService()