import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateSkuBulkService from "@modules/skus/services/CreateSkuBulkService";
import DownloadSkusListCSVService from "@modules/skus/services/DownloadSkusListCSVService";

export default class SkusBulkController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createSkuBulkService = container.resolve(CreateSkuBulkService);

    const createSkuBulk = await createSkuBulkService.execute({
      file: request.file,
    });

    return response.json(createSkuBulk);
  }

  public async download_csv(_: Request, response: Response): Promise<Response> {
    const downloadSkusListCSVService = container.resolve(
      DownloadSkusListCSVService,
    );

    const downloadSkusListCSV = await downloadSkusListCSVService.execute();

    response.header("Content-Type", "text/csv");

    response.attachment("produtos-facebook.csv");

    return response.send(downloadSkusListCSV);
  }
}
