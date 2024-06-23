import axios from 'axios';
const baseUrl = 'http://localhost:3001/auth'

class ValidateTokenService {

  /**
   * Valida se o token existe ainda está válido
   * @param token
   */
  async validateToken(token: string | null) {
    return await axios.post(`${baseUrl}/`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => response.status).catch((error) => {
      throw (error.response.data.message);
    });
  }
}

export default new ValidateTokenService();