import { Request, Response } from 'express';
import { AppDataSource }     from '../data-source';
import { Eventos }           from '../models/Eventos';
import { obtemUsuario }      from '../services/UsuarioService'
import dotenv                from 'dotenv';
import { obtemArrCdMusicas } from '../services/EventoService';
import * as Helpers          from '../services/Helpers';

dotenv.config();

export const createEvento = async (request: Request, response: Response) => {
  try
  {
    const objEventoFields    = request.body;
    const objEventoExistente = await AppDataSource.getRepository(Eventos).findOneBy({ds_evento: objEventoFields.evento.ds_evento});

    if (objEventoExistente != null)
      return response.status(409).json({ message: 'Evento ja cadastrado' });

    if (await obtemUsuario(objEventoFields.evento.cd_usuario_responsavel) == null)
    {
      return response.status(400).json({
        error: 'Falha ao criar evento',
        message: 'Usuario responsavel nao existe',
      });
    }

    const objEventoNovo:  Eventos[] = AppDataSource.getRepository(Eventos).create(objEventoFields.evento);
    const objEventoSalvo: Eventos[] = await AppDataSource.getRepository(Eventos).save(objEventoNovo);

    if (objEventoSalvo['cd_evento'] == null)
      return response.status(400).send({ message: 'Evento nao cadastrado'});

    const objEventoRelations: Eventos = await AppDataSource.getRepository(Eventos).findOne({
      where: { cd_evento: objEventoSalvo['cd_evento'] },
      relations: ['musicas']
    });

    //Verifica se existem musicas
    if (objEventoFields.musicas.arr_musicas_evento)
    {
      const arrMusicasEvento = await obtemArrCdMusicas(objEventoFields.musicas.arr_musicas_evento);

      if (arrMusicasEvento.length > 0)
        objEventoRelations.musicas = arrMusicasEvento;

      await AppDataSource.getRepository(Eventos).save(objEventoRelations);
    }

    return response.status(201).send({ message: 'Evento criado', details: objEventoRelations});
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

export const getEvento = async (request: Request, response: Response) => {
  try
  {
    const cd_evento: number  = +request.params.cd_evento;
    const objEvento: Eventos = await AppDataSource.getRepository(Eventos).findOne({
      where: { cd_evento: cd_evento },
      relations: ['musicas', 'responsavel']
    });

    if (objEvento != null)
      return response.status(200).json(objEvento);

    return response.status(404).json({ message: 'Evento nao encontrado' });
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

export const getEventos = async (request: Request, response: Response) => {
  try
  {
    const listEventos: Eventos[] = await AppDataSource.getRepository(Eventos).find({
      relations: ['musicas', 'responsavel']
    });

    if (listEventos.length > 0)
      return response.status(200).json(listEventos);

    return response.status(404).json({ message: 'Nenhum evento cadastrado' });
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

export const updateEvento = async (request: Request, response: Response) => {
  try
  {
    const cd_evento: number        = +request.params.cd_evento;
    const objEventoFields          = request.body;
    const objEventoUpdate: Eventos = await AppDataSource.getRepository(Eventos).findOne({
      where: { cd_evento: cd_evento },
      relations: ['musicas']
    });

    objEventoFields.evento = Helpers.removeObjKey(objEventoFields.evento, 'cd_evento');

    if (!objEventoUpdate)
      return response.status(404).json({ message: 'Evento nao encontrado' });

    if (await obtemUsuario(objEventoFields.evento.cd_usuario_responsavel) == null)
    {
      return response.status(404).json({
        error: 'Falha ao atualizar evento',
        message: 'Usuario responsavel nao existe',
      });
    }

    if (objEventoFields.musicas)
    {
      const arrMusicasEvento = await obtemArrCdMusicas(objEventoFields.musicas.arr_musicas_evento);

      if (arrMusicasEvento.length > 0)
        objEventoUpdate.musicas = arrMusicasEvento;
    }

    AppDataSource.getRepository(Eventos).merge(objEventoUpdate, objEventoFields.evento);
    await AppDataSource.getRepository(Eventos).save(objEventoUpdate);

    return response.status(200).json({ message: 'Evento atualizado', details: objEventoUpdate });
  }
  catch (error)
  {
    return response.status(500).json({
      error: 'Erro Interno do Servidor',
      message: 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.',
      details: error
    });
  }
};

export const deleteEvento = async (request: Request, response: Response) => {
  try
  {
    const cd_evento: number = +request.params.cd_evento;
    await AppDataSource.getRepository(Eventos).delete({cd_evento: cd_evento});

    return response.status(200).json({ message: 'Evento excluido' });
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