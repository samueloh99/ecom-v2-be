import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateCorreioService from "@modules/configuracoes/services/correios/CreateCorreioService";
import ListCorreioService from "@modules/configuracoes/services/correios/ListCorreioService";
import UpdateCorreioService from "@modules/configuracoes/services/correios/UpdateCorreioService";
import DeleteCorreioService from "@modules/configuracoes/services/correios/DeleteCorreioService";

export default class CorreiosController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      ativo,
      cartao_postagem,
      central,
      cnpj,
      codigo_adm,
      pac_cod,
      sedex_cod,
      senha_sigep,
      titular,
      usuario_sigep,
    } = request.body;

    const createCorreioService = container.resolve(CreateCorreioService);

    const correios = await createCorreioService.execute({
      ativo,
      cartao_postagem,
      central,
      cnpj,
      codigo_adm,
      pac_cod,
      sedex_cod,
      senha_sigep,
      titular,
      usuario_sigep,
    });

    return response.json(correios);
  }

  public async list(_: Request, response: Response): Promise<Response> {
    const listCorreioService = container.resolve(ListCorreioService);

    const all = await listCorreioService.execute();

    return response.json(all);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCorreioService = container.resolve(DeleteCorreioService);

    const deleteCorreios = await deleteCorreioService.execute({
      id: parseInt(id),
    });

    return response.json(deleteCorreios);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const id = parseInt(request.params.id);
    const {
      ativo,
      cnpj,
      cartao_postagem,
      codigo_adm,
      titular,
      central,
      usuario_sigep,
      senha_sigep,
      pac_cod,
      sedex_cod,
    } = request.body;

    const updateCorreioService = container.resolve(UpdateCorreioService);

    const updateCorreios = await updateCorreioService.execute({
      id,
      ativo,
      cnpj,
      cartao_postagem,
      codigo_adm,
      titular,
      central,
      usuario_sigep,
      senha_sigep,
      pac_cod,
      sedex_cod,
    });

    return response.json(updateCorreios);
  }
}
