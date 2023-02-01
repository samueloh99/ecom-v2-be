import { Request, Response } from "express";

import { container } from "tsyringe";

import CreateUserPagarmeService from "@modules/checkout/services/pagarme/CreateUserPagarmeService";
import UpdateUserPagarmeService from "@modules/checkout/services/pagarme/UpdateUserPagarmeService";
import ListUserPagarmeService from "@modules/checkout/services/pagarme/ListUserPagarmeService";

export default class UsersPagarmeController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      email,
      celular,
      codigo_cliente,
      documento,
      genero,
      nascimento,
      telefone,
    } = request.body;

    const createUserPagarmeService = container.resolve(
      CreateUserPagarmeService,
    );

    const createUserPagarme = await createUserPagarmeService.execute({
      nome,
      email,
      celular,
      codigo_cliente,
      documento,
      genero,
      nascimento,
      telefone,
    });

    return response.json(createUserPagarme);
  }

  public async list(_: Request, response: Response): Promise<Response> {
    const listUserPagarmeService = container.resolve(ListUserPagarmeService);

    const listUserPagarme = await listUserPagarmeService.execute();

    return response.json(listUserPagarme);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      customer_id,
      nome,
      email,
      celular,
      codigo_cliente,
      documento,
      genero,
      nascimento,
      telefone,
    } = request.body;

    const updateUserPagarmeService = container.resolve(
      UpdateUserPagarmeService,
    );

    const updateUserPagarme = await updateUserPagarmeService.execute({
      customer_id,
      nome,
      email,
      celular,
      codigo_cliente,
      documento,
      genero,
      nascimento,
      telefone,
    });

    return response.json(updateUserPagarme);
  }
}
