import axios from 'axios'

const baseUrl = 'http://localhost:3001/pessoa'

class PessoaService {

  async createPessoa(data: any, token: any) {
      return await axios.post(baseUrl, data, {
        headers: { Authorization: `Bearer ${token}` }
      }).then((response) => response.status).catch((error) => {
        // @ts-ignore
        throw (error.response.data.message);
      });
  }

  async getPessoa(cd_pessoa: any, token: any) {
    try
    {
      let response = await axios.get(`${baseUrl}/${cd_pessoa}`, {
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

  async getPessoas(token: string | null) {
    return await axios.get(`${baseUrl}`, {
      headers: {Authorization: `Bearer ${token}`}
    }).then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching data:', error)
    })
  }

  async updatePessoa(cd_pessoa: any, data: any, token: any) {
    try
    {
      return await axios.put(`${baseUrl}/${cd_pessoa}`, data, {
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

  async deletePessoa(cd_pessoa: any, token: any) {
      return await axios.delete(`${baseUrl}/${cd_pessoa}`, {
        headers: {Authorization: `Bearer ${token}`}
      }).then((response) => response.status).catch((error) => {
        // @ts-ignore
        throw (error.response.data.message);
      });
  }
}

export default new PessoaService()