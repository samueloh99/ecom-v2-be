import { container } from "tsyringe";
import { Request, Response } from "express";

import CreateFreteService from "@modules/configuracoes/services/fretes/CreateFreteService";
import ListFreteService from "@modules/configuracoes/services/fretes/ListFreteService";
import UpdateFreteService from "@modules/configuracoes/services/fretes/UpdateFreteService";
import DeleteFreteService from "@modules/configuracoes/services/fretes/DeleteFreteService";

export default class FretesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      ativo,
      cep_maximo,
      cep_minimo,
      compra_maxima,
      compra_minima,
      lembrete,
      valido_ate,
      valido_de,
    } = request.body;

    const createFreteService = container.resolve(CreateFreteService);

    const frete = await createFreteService.execute({
      ativo,
      cep_maximo,
      cep_minimo,
      compra_maxima,
      compra_minima,
      lembrete,
      valido_ate,
      valido_de,
    });

    return response.json(frete);
  }

  public async list(_: Request, response: Response): Promise<Response> {
    const listFreteService = container.resolve(ListFreteService);

    const all = await listFreteService.execute();

    return response.json(all);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteFreteService = container.resolve(DeleteFreteService);

    const deleteFrete = await deleteFreteService.execute({
      id: parseInt(id),
    });

    return response.json(deleteFrete);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const id = parseInt(request.params.id);
    const {
      ativo,
      lembrete,
      cep_minimo,
      cep_maximo,
      compra_minima,
      compra_maxima,
      valido_de,
      valido_ate,
    } = request.body;

    const updateFreteService = container.resolve(UpdateFreteService);

    const updatedFrete = await updateFreteService.execute({
      id,
      ativo,
      lembrete,
      cep_minimo,
      cep_maximo,
      compra_minima,
      compra_maxima,
      valido_de,
      valido_ate,
    });

    return response.json(updatedFrete);
  }
}
