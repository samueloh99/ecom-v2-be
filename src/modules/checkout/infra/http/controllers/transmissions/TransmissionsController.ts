import { Request, Response } from "express";

import { container } from "tsyringe";

import CreateTransmissionService from "@modules/checkout/services/transmissions/CreateTransmissionService";
import ListTransmissionService from "@modules/checkout/services/transmissions/ListTransmissionService";

export default class TransmissionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { servico, usuario_id, pedido_id, message } = request.body;

    const createTransmissionService = container.resolve(
      CreateTransmissionService,
    );

    const createTransmission = await createTransmissionService.execute({
      servico,
      usuario_id,
      pedido_id,
      message,
    });

    return response.json(createTransmission);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listTransmissionService = container.resolve(ListTransmissionService);

    const listTransmission = await listTransmissionService.execute();

    return response.json(listTransmission);
  }
}
