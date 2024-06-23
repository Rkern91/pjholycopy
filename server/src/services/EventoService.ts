import { AppDataSource } from '../data-source';
import { Eventos }       from '../models/Eventos';
import {Musicas} from "../models/Musicas";

/**
 * Verifica se um usuario está definido como responsável de um evento.
 * @param cd_pessoa
 */
export const getEventoUsuario = async (cd_pessoa: number): Promise<any> => {
  try
  {
    const objEvento = await AppDataSource.getRepository(Eventos).findOneBy({cd_usuario_responsavel: cd_pessoa});

    if (objEvento == null)
      return null;

    return objEvento;
  }
  catch (error)
  {
    throw new Error('Erro ao buscar evento: ' + error.message);
  }
}

/**
 * Extraí as músicas passdas por array
 * @param dsArrMusicas
 */
export const obtemArrCdMusicas = async (dsArrMusicas: string) => {
  // Remove as chaves da string e remove espaços extras
  const cleanMusicas = dsArrMusicas.replace(/[{}]/g, '').trim();

  // Divide a string em um array, lidando com o caso de uma música
  const arrMusicas       = cleanMusicas.length > 0 ? cleanMusicas.split(',') : [];
  const arrMusicasEvento = [];

  for (const cd_musica of arrMusicas)
  {
    const objMusica = await AppDataSource.getRepository(Musicas).findOne({ where: { cd_musica: parseInt(cd_musica) } });

    if (objMusica)
      arrMusicasEvento.push(objMusica);
  }

  return arrMusicasEvento;
}