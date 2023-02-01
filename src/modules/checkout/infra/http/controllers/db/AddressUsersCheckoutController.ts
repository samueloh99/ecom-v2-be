import { Request, Response } from "express";

import { container } from "tsyringe";

import CreateAddressUserCheckoutService from "@modules/checkout/services/db/CreateAddressUserCheckoutService";

export default class AddressUsersCheckoutController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      ativo,
      cep,
      usuario_id,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      pais,
      lembrete,
      destinatario,
    } = request.body;

    const createEndereco = container.resolve(CreateAddressUserCheckoutService);

    const newEndereco = await createEndereco.execute({
      ativo,
      usuario_id,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      pais,
      lembrete,
      destinatario,
    });

    return response.json(newEndereco);
  }
}
