import { Request, Response } from "express";

import { container } from "tsyringe";

import CreateDescontoService from "@modules/produtos/services/CreateDescontoService";
import ListDescontoService from "@modules/produtos/services/ListDescontoService";
import DeleteDescontoService from "@modules/produtos/services/DeleteDescontoService";
import UpdateDescontoService from "@modules/produtos/services/UpdateDescontoService";

export default class DescontosController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      produto_id,
      desconto_tipo,
      desconto_valor,
      data_desconto_1,
      data_desconto_2,
    } = request.body;

    const createDescontoService = container.resolve(CreateDescontoService);

    const novoDesconto = await createDescontoService.execute({
      produto_id,
      desconto_tipo,
      desconto_valor,
      data_desconto_1,
      data_desconto_2,
    });

    return response.json(novoDesconto);
  }

  public async list(_: Request, response: Response): Promise<Response> {
    const listDescontoService = container.resolve(ListDescontoService);

    const allDescontos = await listDescontoService.execute();

    return response.json(allDescontos);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);

    const deleteDescontoService = container.resolve(DeleteDescontoService);

    const findDescontoAndDelete = await deleteDescontoService.execute(parsedId);

    return response.json(findDescontoAndDelete);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const {
      produto_id,
      desconto_tipo,
      desconto_valor,
      data_desconto_1,
      data_desconto_2,
    } = request.body;

    const updateDescontoService = container.resolve(UpdateDescontoService);

    const findDescontoAndEdit = await updateDescontoService.execute({
      id: parseInt(id),
      produto_id,
      desconto_tipo,
      desconto_valor,
      data_desconto_1,
      data_desconto_2,
    });

    return response.json(findDescontoAndEdit);
  }
}
