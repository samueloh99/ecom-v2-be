import { Request, Response } from "express";

import { container } from "tsyringe";

import ListProductBlingService from "@modules/produtos/services/bling/ListProductBlingService";
import CreateProductBulkBlingService from "@modules/produtos/services/bling/CreateProductBulkBlingService";
import CreateProductBlingFromSQSService from "@modules/produtos/services/bling/CreateProductBlingFromSQSService";

export default class ProductsBlingController {
  public async list(_: Request, response: Response): Promise<Response> {
    const listProductBlingService = container.resolve(ListProductBlingService);

    const allProducts = await listProductBlingService.execute();

    return response.json(allProducts);
  }

  public async create_bulk(_: Request, response: Response): Promise<Response> {
    const createProductBulkBlingService = container.resolve(
      CreateProductBulkBlingService,
    );

    const createProductBulkBling =
      await createProductBulkBlingService.execute();

    return response.json(createProductBulkBling);
  }

  public async create_consume(
    _: Request,
    response: Response,
  ): Promise<Response> {
    const createProductBlingFromSQSService = container.resolve(
      CreateProductBlingFromSQSService,
    );

    const createProductBlingFromSQS =
      await createProductBlingFromSQSService.execute();

    return response.json(createProductBlingFromSQS);
  }
}
