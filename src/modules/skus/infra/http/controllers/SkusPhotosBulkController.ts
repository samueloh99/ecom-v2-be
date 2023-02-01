import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateSkuPhotoBulkService from "@modules/skus/services/CreateSkuPhotoBulkService";
import ListSkuPhotoService from "@modules/skus/services/ListSkuPhotoService";

export default class SkusPhotosBulkController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createSkuPhotoBulkService = container.resolve(
      CreateSkuPhotoBulkService,
    );

    const createSkuPhotoBulk = await createSkuPhotoBulkService.execute({
      foto: request.file,
    });

    return response.json(createSkuPhotoBulk);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listSkuPhotoService = container.resolve(ListSkuPhotoService);

    const listSkuPhoto = await listSkuPhotoService.execute();

    return response.json(listSkuPhoto);
  }
}
