import { Request, Response } from "express";

import { container } from "tsyringe";

import CreateFavoritoService from "@modules/skus/services/CreateFavoritoService";
import DeleteFavoritoService from "@modules/skus/services/DeleteFavoritoService";
import ListFavoritoService from "@modules/skus/services/ListFavoritoService";

export default class FavoritosController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { usuario_id, sku_id } = request.body;

    const createFavoritoService = container.resolve(CreateFavoritoService);

    const newFavorito = await createFavoritoService.execute({
      usuario_id,
      sku_id,
    });

    return response.json(newFavorito);
  }

  public async list(_: Request, response: Response): Promise<Response> {
    const listFavoritoService = container.resolve(ListFavoritoService);

    const listFavoritos = await listFavoritoService.execute();

    return response.json(listFavoritos);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteFavoritoService = container.resolve(DeleteFavoritoService);

    const deleteFavorito = await deleteFavoritoService.execute(parseInt(id));

    return response.json(deleteFavorito);
  }
}
