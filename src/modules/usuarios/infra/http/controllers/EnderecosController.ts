import { Request, Response } from "express";

import { container } from "tsyringe";

import CreateEnderecoService from "@modules/usuarios/services/CreateEnderecoService";
import ListEnderecoService from "@modules/usuarios/services/ListEnderecoService";
import DeleteEnderecoService from "@modules/usuarios/services/DeleteEnderecoService";
import UpdateEnderecoService from "@modules/usuarios/services/UpdateEnderecoService";

export default class UsuariosController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      ativo,
      cep,
      usuario_id,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      pais,
      lembrete,
      destinatario,
    } = request.body;

    const createEndereco = container.resolve(CreateEnderecoService);

    const newEndereco = await createEndereco.execute({
      ativo,
      usuario_id,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      pais,
      lembrete,
      destinatario,
    });

    return response.json(newEndereco);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const {
      mostrar,
      atual,
      cep,
      endereco,
      numero,
      bairro,
      cidade,
      estado,
      pais,
      destinatario,
      cadastroFim,
      cadastroInicio,
      usuarioId,
    } = request.query;

    const listEnderecoService = container.resolve(ListEnderecoService);

    const all = await listEnderecoService.execute({
      perPage: parseInt(mostrar as string),
      currentPage: parseInt(atual as string),
      cep: cep as string,
      endereco: endereco as string,
      numero: numero as string,
      bairro: bairro as string,
      cidade: cidade as string,
      estado: estado as string,
      pais: pais as string,
      destinatario: destinatario as string,
      cadastroInicio: cadastroInicio as string,
      cadastroFim: cadastroFim as string,
      usuarioId: usuarioId as string,
    });

    return response.json(all);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteEnderecoService = container.resolve(DeleteEnderecoService);

    const deleteEndereco = await deleteEnderecoService.execute({
      id: parseInt(id),
    });

    return response.json(deleteEndereco);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const {
      ativo,
      usuario_id,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      pais,
      destinatario,
      lembrete,
    } = request.body;

    const updateEnderecoService = container.resolve(UpdateEnderecoService);

    const newEndereco = await updateEnderecoService.execute({
      id: parseInt(id),
      ativo,
      usuario_id,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      pais,
      destinatario,
      lembrete,
    });

    return response.json(newEndereco);
  }
}
