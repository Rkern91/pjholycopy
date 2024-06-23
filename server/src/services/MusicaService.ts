import { AppDataSource } from '../data-source';
import { Musicas }       from "../models/Musicas";

/**
 * Verifica se um genero está ligado a uma música.
 * @param cd_genero
 */
export const obtemMusicaByGenero = async (cd_genero: number): Promise<any> => {
  try
  {
    const objMusicas = await AppDataSource.getRepository(Musicas).findOneBy({cd_genero: cd_genero});

    if (objMusicas == null)
      return null;

    return objMusicas;
  }
  catch (error)
  {
    throw new Error('Erro ao buscar musicas associadas ao genero: ' + error.message);
  }
}