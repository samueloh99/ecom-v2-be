import { Request, Response } from "express";

import { container } from "tsyringe";

import CreateUserAddressPagarmeService from "@modules/checkout/services/pagarme/CreateUserAddressPagarmeService";

export default class UsersAddressPagarmeController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      bairro,
      cep,
      cidade,
      complemento,
      customer_id,
      destinatario,
      endereco,
      estado,
      numero,
      referencia,
    } = request.body;

    const createUserAddressPagarmeService = container.resolve(
      CreateUserAddressPagarmeService,
    );

    const createUserAddressPagarme =
      await createUserAddressPagarmeService.execute({
        bairro,
        cep,
        cidade,
        complemento,
        customer_id,
        destinatario,
        endereco,
        estado,
        numero,
        referencia,
      });

    return response.json(createUserAddressPagarme);
  }
}
