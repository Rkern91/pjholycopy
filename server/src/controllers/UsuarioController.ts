import { Request, Response } from 'express';
import { AppDataSource }     from '../data-source';
import { Usuarios }          from '../models/Usuarios';
import { Pessoas }           from '../models/Pessoas';
import { Eventos }           from '../models/Eventos';
import * as Helpers from '../services/Helpers';
import dotenv                from 'dotenv';

dotenv.config();

export const createUsuario = async (request: Request,  response: Response) => {
  try
  {
    const cd_pessoa: number = +request.params.cd_pessoa;
    const objUsuarioFields  = request.body;
    const pessoaRepository  = await AppDataSource.getRepository(Pessoas).findOneBy({ cd_pessoa: cd_pessoa });

    if (pessoaRepository == null)
      return response.status(404).json({ message: 'Pessoa nao encontrada. Para criar um usuario, deve-se informar um codigo de pessoa cadastrada.' });

    const usuarioRepository = await AppDataSource.getRepository(Usuarios).findOneBy({ds_username: objUsuarioFields.ds_username});

    if (usuarioRepository != null)
      return response.status(409).json({ message: 'Usuario ja cadastrado' });

    const objPessoaUsuarioExistente = await AppDataSource.getRepository(Usuarios).findOneBy({cd_pessoa: cd_pessoa});

    if (objPessoaUsuarioExistente != null)
      return response.status(409).json({ message: 'Cadastro de pessoa ja possui usuario' });

    const usuario:    Usuarios[] = AppDataSource.getRepository(Usuarios).create({...request.body, cd_pessoa: cd_pessoa});
    const UsuarioNew: Usuarios[] = await AppDataSource.getRepository(Usuarios).save(usuario);

    if (UsuarioNew == null)
      return response.status(404).json({ message: 'Usuario nao cadastrado', details: UsuarioNew });

    return response.status(201).json(UsuarioNew);
  }
  catch (error)
  {
    return response.status(500).json({
      error: "Erro Interno do Servidor",
      message: 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.',
      details: error
    });
  }
}

export const getUsuario = async (request: Request,  response: Response) => {
  try
  {
    const cd_pessoa: number = +request.params.cd_pessoa;
    const objUsuario        = await AppDataSource.getRepository(Usuarios).findOneBy({cd_pessoa: cd_pessoa});

    if (objUsuario == null)
      return response.status(404).json({ message: 'Usuario nao encontrado' });

    return response.status(200).json(objUsuario);
  }
  catch (error)
  {
    return response.status(500).json({
      error: "Erro Interno do Servidor",
      message: 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.',
      details: error
    });
  }
}

export const getUsuarios = async (request: Request,  response: Response) => {
  try
  {
    const listUsuarios: Usuarios[] = await AppDataSource.getRepository(Usuarios).find();

    if (listUsuarios.length <= 0)
      return response.status(404).json({ message: 'Nenhum usuario cadastrado' });

    return response.status(200).json(listUsuarios);
  }
  catch (error)
  {
    return response.status(500).json({
      error: "Erro Interno do Servidor",
      message: 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.',
      details: error
    });
  }
}

export const updateUsuario = async (request: Request,  response: Response) => {
  try
  {
    const cd_pessoa:  number   = +request.params.cd_pessoa;
    const objUsuarioFields     = await Helpers.removeObjKey(request.body, 'cd_pessoa');
    const objUsuario: Usuarios = await AppDataSource.getRepository(Usuarios).findOneBy({cd_pessoa: cd_pessoa});

    if (objUsuario == null)
      return response.status(404).json({ message: 'Usuario nao encontrada' });

    AppDataSource.getRepository(Usuarios).merge(objUsuario, objUsuarioFields);
    const results: Usuarios = await AppDataSource.getRepository(Usuarios).save(objUsuario)
    return response.status(200).json({message: 'Usuario atualizado', details: results});
  }
  catch (error)
  {
    return response.status(500).json({
      error: "Erro Interno do Servidor",
      message: 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.',
      details: error
    });
  }
}

export const deleteUsuario = async (request: Request,  response: Response) => {
  try
  {
    const cd_pessoa: number = +request.params.cd_pessoa;

    await AppDataSource.getRepository(Eventos).findOneBy({cd_usuario_responsavel: cd_pessoa}).then((eventoResponse) => {
      if (eventoResponse != null)
        return response.status(409).json({
          error: "Conflito",
          message: "O usuario nao pode ser removido. O usuario esta registrado como responsavel em um ou mais eventos. " +
            "Por favor, exclua os eventos ou atribua novos responsaveis.",
          details: eventoResponse
        });
    });

    await AppDataSource.getRepository(Usuarios).delete({cd_pessoa: cd_pessoa});
    return response.status(200).json({ message: 'Usuario excluida' });
  }
  catch (error)
  {
    return response.status(500).json({
      error: "Erro Interno do Servidor",
      message: 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.',
      details: error
    });
  }
}

