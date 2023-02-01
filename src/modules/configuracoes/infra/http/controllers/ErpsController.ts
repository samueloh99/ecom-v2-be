import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateErpService from "@modules/configuracoes/services/erps/CreateErpService";
import ListErpService from "@modules/configuracoes/services/erps/ListErpService";
import UpdateErpService from "@modules/configuracoes/services/erps/UpdateErpService";
import DeleteErpService from "@modules/configuracoes/services/erps/DeleteErpService";

export default class ErpsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { ativo, api_key, codigo_deposito } = request.body;

    const createErpService = container.resolve(CreateErpService);

    const erp = await createErpService.execute({
      ativo,
      api_key,
      codigo_deposito,
    });

    return response.json(erp);
  }

  public async list(_: Request, response: Response): Promise<Response> {
    const listErpService = container.resolve(ListErpService);

    const all = await listErpService.execute();

    return response.json(all);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteErpService = container.resolve(DeleteErpService);

    const deleteErp = await deleteErpService.execute({
      id: parseInt(id),
    });

    return response.json(deleteErp);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const id = parseInt(request.params.id);
    const { ativo, api_key, codigo_deposito } = request.body;

    const updateErpService = container.resolve(UpdateErpService);

    const updatedErp = await updateErpService.execute({
      id,
      api_key,
      codigo_deposito,
      ativo,
    });

    return response.json(updatedErp);
  }
}
