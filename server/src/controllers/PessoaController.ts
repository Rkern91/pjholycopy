import { Request, Response } from 'express';
import { AppDataSource }     from '../data-source';
import dotenv                from 'dotenv';
import { Pessoas }           from '../models/Pessoas';
import { Usuarios }          from '../models/Usuarios';
import { getEventoUsuario }  from '../services/EventoService';
import { removeObjKey }    from '../services/Helpers';
import {Eventos} from "../models/Eventos";
import {Musicas} from "../models/Musicas";

dotenv.config();

export const createPessoa = async (request: Request, response: Response) => {
  try
  {
    const pessoaRepository = await AppDataSource.getRepository(Pessoas).findOneBy({nm_pessoa: request.body.nm_pessoa});

    if (pessoaRepository != null)
      return response.status(409).json({ message: 'Pessoa ja cadastrada' });

    const pessoa:    Pessoas[] = AppDataSource.getRepository(Pessoas).create(request.body);
    const PessoaNew: Pessoas[] = await AppDataSource.getRepository(Pessoas).save(pessoa);

    if (PessoaNew != null)
      return response.status(201).send({ message: 'Pessoa criada', details: PessoaNew });

    return response.status(404).send({ message: 'Pessoa nao cadastrada' });
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

export const getPessoa = async (request: Request, response: Response) => {
  try
  {
    const cd_pessoa: number = +request.params.cd_pessoa;
    const objPessoa         = await AppDataSource.getRepository(Pessoas).findOneBy({cd_pessoa: cd_pessoa});

    if (objPessoa != null)
      return response.status(200).json(objPessoa);

    return response.status(404).json({ message: 'Pessoa nao encontrada' });
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

export const getPessoas = async (request: Request, response: Response) => {
  try
  {
    const listPessoas: Pessoas[] = await AppDataSource.getRepository(Pessoas).find();

    if (listPessoas.length > 0)
      return response.status(200).json(listPessoas);

    return response.status(404).json({ message: 'Nenhuma pessoa cadastrada' });
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

export const updatePessoa = async (request: Request, response: Response) => {
  try
  {
    const cd_pessoa: number  = +request.params.cd_pessoa;
    const objPessoaFields    = await removeObjKey(request.body, 'cd_pessoa');
    const objPessoa: Pessoas = await AppDataSource.getRepository(Pessoas).findOneBy({cd_pessoa: cd_pessoa});

    if (objPessoa == null)
      return response.status(404).json({ message: 'Pessoa nao encontrada' });

    await AppDataSource.getRepository(Pessoas).update({cd_pessoa}, objPessoaFields);
    const objPessoaAtualizada: Pessoas = await AppDataSource.getRepository(Pessoas).findOneBy({cd_pessoa: cd_pessoa});

    return response.status(200).json({ message: 'Pessoa atualizada', details: objPessoaAtualizada });
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

export const deletePessoa = async (request: Request, response: Response) => {
  try
  {
    const cd_pessoa: number = +request.params.cd_pessoa;
    const objEventoUsuario  = await getEventoUsuario(cd_pessoa);

    if (objEventoUsuario != null)
    {
      return response.status(409).json({
        error: "Conflito",
        message: 'A pessoa nao pode ser excluida porque o seu usuário esta ligado a um ou mais eventos.',
        details: objEventoUsuario
      });
    }

    await AppDataSource.getRepository(Musicas).findOneBy({cd_autor: cd_pessoa}).then((musicasResponse) => {
      if (musicasResponse != null)
        return response.status(409).json({
          error: "Conflito",
          message: "A pessoa nao pode ser removida. A pessoa esta registrado como autor de uma ou mais musicas. " +
            "Por favor, remova as musicas ou atribua novo autor.",
          details: musicasResponse
        });
    });

    await AppDataSource.getRepository(Usuarios).delete({cd_pessoa: cd_pessoa});
    await AppDataSource.getRepository(Pessoas).delete({cd_pessoa:  cd_pessoa});

    return response.status(200).json({ message: 'Pessoa excluida' });
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

