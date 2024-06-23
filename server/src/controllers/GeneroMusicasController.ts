import { Request, Response }   from 'express';
import { AppDataSource }       from '../data-source';
import { GeneroMusicas }       from '../models/GeneroMusicas';
import dotenv                  from 'dotenv';
import { obtemMusicaByGenero } from "../services/MusicaService";
import * as Helpers            from '../services/Helpers';

dotenv.config();

export const createGeneroMusica = async (request: Request,  response: Response) => {
  try
  {
    const generoRepository = await AppDataSource.getRepository(GeneroMusicas).findOneBy({ds_genero: request.body.ds_genero});

    if (generoRepository != null)
      return response.status(409).json({ message: 'Genero ja cadastrado' });

    const genero:          GeneroMusicas[] = AppDataSource.getRepository(GeneroMusicas).create(request.body);
    const GeneroMusicaNew: GeneroMusicas[] = await AppDataSource.getRepository(GeneroMusicas).save(genero);

    if (GeneroMusicaNew != null)
      return response.status(201).send({ message: 'Genero cadastrado', details: GeneroMusicaNew });

    return response.status(404).send({ message: 'Genero nao cadastrado' });
  }
  catch (error)
  {
    return response.status(500).json({
      error: 'Erro Interno do Servidor',
      message: 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.',
      details: error
    });
  }
}

export const getGeneroMusica = async (request: Request,  response: Response) => {
  try
  {
    const cd_genero: number = +request.params.cd_genero;
    const objGeneroMusica   = await AppDataSource.getRepository(GeneroMusicas).findOneBy({cd_genero: cd_genero});

    if (objGeneroMusica != null)
      return response.status(200).json(objGeneroMusica);

    return response.status(404).json({ message: 'Genero nao encontrado' });
  }
  catch (error)
  {
    return response.status(500).json({
      error: 'Erro Interno do Servidor',
      message: 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.',
      details: error
    });
  }
}

export const getGeneroMusicas = async (request: Request,  response: Response) => {
  try
  {
    const listGeneroMusicas: GeneroMusicas[] = await AppDataSource.getRepository(GeneroMusicas).find();

    if (listGeneroMusicas.length > 0)
      return response.status(200).json(listGeneroMusicas);

    return response.status(404).json({ message: 'Nenhum genero cadastrado' });
  }
  catch (error)
  {
    return response.status(500).json({
      error: 'Erro Interno do Servidor',
      message: 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.',
      details: error
    });
  }
}

export const updateGeneroMusica = async (request: Request,  response: Response) => {
  try
  {
    const cd_genero: number              = +request.params.cd_genero;
    const objGeneroMusicaFields          = await Helpers.removeObjKey(request.body, 'cd_genero');
    const objGeneroMusica: GeneroMusicas = await AppDataSource.getRepository(GeneroMusicas).findOneBy({cd_genero: cd_genero});

    if (objGeneroMusica == null)
      return response.status(404).json({ message: 'Genero nao encontrado' });

    const objGeneroMusicaUpdate = await AppDataSource.getRepository(GeneroMusicas).update({cd_genero}, objGeneroMusicaFields);
    return response.status(200).json({ message: 'Genero atualizado', details: objGeneroMusicaUpdate });
  }
  catch (error)
  {
    return response.status(500).json({
      error: 'Erro Interno do Servidor',
      message: 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.',
      details: error
    });
  }
}

export const deleteGeneroMusica = async (request: Request,  response: Response) => {
  try
  {
    const cd_genero: number = +request.params.cd_genero;
    const objMusicaGenero   = await obtemMusicaByGenero(cd_genero);

    if (objMusicaGenero != null)
    {
      return response.status(409).json({
        error: "Conflito",
        message: 'O genero musical não pode ser excluido porque está associado a uma ou mais musicas.',
        details: objMusicaGenero
      });
    }

    await AppDataSource.getRepository(GeneroMusicas).delete({cd_genero: cd_genero});

    return response.status(200).json({ message: 'Genero excluido' });
  }
  catch (error)
  {
    return response.status(500).json({
      error: 'Erro Interno do Servidor',
      message: 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.',
      details: error
    });
  }
}