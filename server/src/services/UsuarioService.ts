import { AppDataSource }     from '../data-source';
import {Usuarios} from "../models/Usuarios";

/**
 * Verifica se um usuario existe.
 * @param cd_pessoa
 */
export const obtemUsuario = async (cd_pessoa: number): Promise<any> => {
  try
  {
    const objUsuario = await AppDataSource.getRepository(Usuarios).findOneBy({cd_pessoa: cd_pessoa});

    if (objUsuario == null)
      return null;

    return objUsuario;
  }
  catch (error)
  {
    throw new Error('Erro ao buscar evento: ' + error.message);
  }
}