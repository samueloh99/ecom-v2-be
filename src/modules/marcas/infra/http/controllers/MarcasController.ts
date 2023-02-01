import { Request, Response } from "express";

import { container } from "tsyringe";

import CreateMarcaService from "@modules/marcas/services/CreateMarcaService";
import ListMarcaService from "@modules/marcas/services/ListMarcaService";
import DeleteMarcaService from "@modules/marcas/services/DeleteMarcaService";
import UpdateMarcaService from "@modules/marcas/services/UpdateMarcaService";
export default class MarcasController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, ativo } = request.body;

    const createMarca = container.resolve(CreateMarcaService);

    const marca = await createMarca.execute({
      nome,
      ativo,
    });

    return response.json(marca);
  }

  public async list(_: Request, response: Response): Promise<Response> {
    const createMarca = container.resolve(ListMarcaService);

    const all = await createMarca.execute();

    return response.json(all);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteMarcaContainer = container.resolve(DeleteMarcaService);

    const deleteMarcaRes = await deleteMarcaContainer.execute({
      id: parseInt(id),
    });

    return response.json(deleteMarcaRes);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const id = parseInt(request.params.id);
    const { nome, ativo } = request.body;

    const updateMarca = container.resolve(UpdateMarcaService);

    const marca = await updateMarca.execute({
      id,
      nome,
      ativo,
    });

    return response.json(marca);
  }
}
