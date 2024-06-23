import { Request, Response } from 'express';
import { AppDataSource }     from '../data-source';
import dotenv                from 'dotenv';
import { Musicas }           from '../models/Musicas';
import { Eventos }           from "../models/Eventos";
import * as Helpers          from '../services/Helpers';

dotenv.config();

export const createMusica = async (request: Request, response: Response) => {
  try
  {
    const musicaRepository = await AppDataSource.getRepository(Musicas).findOneBy({nm_musica: request.body.nm_musica});

    if (musicaRepository != null)
      return response.status(409).json({ message: 'Musica ja cadastrada' });

    const musica:    Musicas[] = AppDataSource.getRepository(Musicas).create(request.body);
    const MusicaNew: Musicas[] = await AppDataSource.getRepository(Musicas).save(musica);

    if (MusicaNew != null)
      return response.status(201).send({ message: 'Musica criada', details: MusicaNew });

    return response.status(404).send({ message: 'Musica nao cadastrada' });
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

export const getMusica = async (request: Request, response: Response) => {
  try
  {
    const cd_musica: number = +request.params.cd_musica;
    const objMusica         = await AppDataSource.getRepository(Musicas).findOne({
      where: { cd_musica: cd_musica },
      relations: ['autor', 'genero', 'eventos']
    });

    if (objMusica != null)
      return response.status(200).json(objMusica);

    return response.status(404).json({ message: 'Musica nao encontrada' });
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

export const getMusicas = async (request: Request, response: Response) => {
  try
  {
    const listMusicas: Musicas[] = await AppDataSource.getRepository(Musicas).find({
      relations: ['autor', 'genero', 'eventos']
    });

    if (listMusicas.length > 0)
      return response.status(200).json(listMusicas);

    return response.status(404).json({ message: 'Nenhuma musica cadastrada' });
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

export const updateMusica = async (request: Request, response: Response) => {
  try
  {
    const cd_musica: number  = +request.params.cd_musica;
    const objMusicaFields    = await Helpers.removeObjKey(request.body, 'cd_musica');
    const objMusica: Musicas = await AppDataSource.getRepository(Musicas).findOneBy({cd_musica: request.body.cd_musica});

    if (objMusica == null)
      return response.status(404).json({ message: 'Musica nao encontrada' });

    const objMusicaUpdate = await AppDataSource.getRepository(Musicas).update({cd_musica}, objMusicaFields);
    return response.status(200).json({ message: 'Musica atualizada', details: objMusicaUpdate });
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

export const deleteMusica = async (request: Request, response: Response) => {
  try
  {
    const cd_musica: number = +request.params.cd_musica;

    // Verificar se a música está associada a algum evento
    const eventosComMusica = await AppDataSource.getRepository(Eventos)
    .createQueryBuilder('eventos')
    .leftJoinAndSelect('eventos.musicas', 'musicas')
    .where('musicas.cd_musica = :cd_musica', { cd_musica })
    .getMany();

    if (eventosComMusica.length > 0) {
      return response.status(409).json({
        error: "Conflito",
        message: "A música não pode ser removida. A música está associada a um ou mais eventos. " +
          "Por favor, remova os eventos ou remova a música do evento.",
        details: eventosComMusica
      });
    }

    await AppDataSource.getRepository(Musicas).delete({cd_musica:  cd_musica});

    return response.status(200).json({ message: 'Musica excluida' });
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

