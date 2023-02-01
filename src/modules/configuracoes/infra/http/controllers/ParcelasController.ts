import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateParcelaService from "@modules/configuracoes/services/parcelas/CreateParcelaService";
import ListParcelaService from "@modules/configuracoes/services/parcelas/ListParcelaService";
import UpdateParcelaService from "@modules/configuracoes/services/parcelas/UpdateParcelaService";
import DeleteParcelaService from "@modules/configuracoes/services/parcelas/DeleteParcelaService";

export default class ParcelasController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { ativo, parcela, taxa, tipo, valor } = request.body;

    const createParcelaService = container.resolve(CreateParcelaService);

    const newParcela = await createParcelaService.execute({
      ativo,
      parcela,
      taxa,
      tipo,
      valor,
    });

    return response.json(newParcela);
  }

  public async list(_: Request, response: Response): Promise<Response> {
    const listParcelaService = container.resolve(ListParcelaService);

    const all = await listParcelaService.execute();

    return response.json(all);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteParcelaService = container.resolve(DeleteParcelaService);

    const deleteParcela = await deleteParcelaService.execute({
      id: parseInt(id),
    });

    return response.json(deleteParcela);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const id = parseInt(request.params.id);
    const { ativo, parcela, taxa, tipo, valor } = request.body;

    const updateParcelaService = container.resolve(UpdateParcelaService);

    const updatedParcela = await updateParcelaService.execute({
      id,
      ativo,
      parcela,
      taxa,
      tipo,
      valor,
    });

    return response.json(updatedParcela);
  }
}
