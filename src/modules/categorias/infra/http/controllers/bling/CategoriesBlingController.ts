import { Request, Response } from "express";

import { container } from "tsyringe";

import CreateCategoryBlingService from "@modules/categorias/services/bling/CreateCategoryBlingService";
import CreateCategoryBulkBlingService from "@modules/categorias/services/bling/CreateCategoryBulkBlingService";

import ListCategoryBlingService from "@modules/categorias/services/bling/ListCategoryBlingService";

export default class CategoriesBlingController {
  public async create_bulk(_: Request, response: Response): Promise<Response> {
    const createCategoryBulkBlingService = container.resolve(
      CreateCategoryBulkBlingService,
    );

    const createCategoryBulkBling =
      await createCategoryBulkBlingService.execute();

    return response.json(createCategoryBulkBling);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { descricao, idCategoriaPai } = request.body;

    const createCategoryBlingService = container.resolve(
      CreateCategoryBlingService,
    );

    const newCategory = await createCategoryBlingService.execute({
      descricao,
      idCategoriaPai,
    });

    return response.json(newCategory);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listCategoryBlingService = container.resolve(
      ListCategoryBlingService,
    );

    const allCategories = await listCategoryBlingService.execute();

    return response.json(allCategories);
  }
}
