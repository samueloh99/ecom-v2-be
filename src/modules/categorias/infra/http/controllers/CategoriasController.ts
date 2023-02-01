import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateCategoriaService from "@modules/categorias/services/CreateCategoriaService";
import ListCategoriaService from "@modules/categorias/services/ListCategoriaService";
import DeleteCategoriaService from "@modules/categorias/services/DeleteCategoriaService";
import UpdateCategoriaService from "@modules/categorias/services/UpdateCategoriaService";

export default class CategoriasController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { ativo, pai_id, nome, slug } = request.body;

    const categoriaContainer = container.resolve(CreateCategoriaService);

    const categoria = await categoriaContainer.execute({
      ativo,
      pai_id,
      nome,
      slug,
    });

    return response.json(categoria);
  }

  public async list(_: Request, response: Response): Promise<Response> {
    const categoriaContainer = container.resolve(ListCategoriaService);
    const all = await categoriaContainer.execute();

    return response.json(all);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCategoriaContainer = container.resolve(DeleteCategoriaService);

    const deleteCategoriaRes = await deleteCategoriaContainer.execute({
      id: parseInt(id),
    });

    return response.json(deleteCategoriaRes);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const id = parseInt(request.params.id);
    const { nome, ativo, pai_id } = request.body;

    const updateCategoria = container.resolve(UpdateCategoriaService);

    const categoria = await updateCategoria.execute({
      id,
      nome,
      ativo,
      pai_id,
    });

    return response.json(categoria);
  }
}
