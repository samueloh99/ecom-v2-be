import { Request, Response } from "express";

import { container } from "tsyringe";

import ListWebhookPagarmeService from "@modules/checkout/services/pagarme/ListWebhookPagarmeService";
import CreateWebhookPagarmeService from "@modules/checkout/services/pagarme/CreateWebhookPagarmeService";

export default class WebhookPagarmController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createWebhookPagarmeService = container.resolve(
      CreateWebhookPagarmeService,
    );

    const createWebhookPagarme = await createWebhookPagarmeService.execute(
      request.body,
    );

    return response.json(createWebhookPagarme);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listWebhookPagarmeService = container.resolve(
      ListWebhookPagarmeService,
    );

    const listWebhookPagarme = await listWebhookPagarmeService.execute();

    return response.json(listWebhookPagarme);
  }
}
