import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateProdutosDescriptionBulkService from "@modules/produtos/services/CreateProdutosDescriptionBulkService";

export default class SkusBulkController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createProdutosDescriptionBulkService = container.resolve(
      CreateProdutosDescriptionBulkService,
    );

    const createProdutosDescriptionBulk =
      await createProdutosDescriptionBulkService.execute({
        file: request.file,
      });

    return response.json(createProdutosDescriptionBulk);
  }
}
