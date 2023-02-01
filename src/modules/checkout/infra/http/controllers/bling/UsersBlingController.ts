import { Request, Response } from "express";

import { container } from "tsyringe";

import ListUserBlingService from "@modules/checkout/services/bling/ListUserBlingService";
import CreateClientBlingService from "@modules/checkout/services/bling/CreateClientBlingService";

export default class UsersBlingController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      tipoPessoa, //F, J ou E
      contribuinte,
      cpf_cnpj,
      endereco,
      numero,
      complemento,
      bairro,
      cep,
      cidade,
      uf,
      fone,
      celular,
      email,
      emailNfe,
      paisOrigem,
      codigo,
    } = request.body;

    const createClientBlingService = container.resolve(
      CreateClientBlingService,
    );

    const createClientBling = await createClientBlingService.execute({
      nome,
      tipoPessoa, //F, J ou E
      contribuinte,
      cpf_cnpj,
      endereco,
      numero,
      complemento,
      bairro,
      cep,
      cidade,
      uf,
      fone,
      celular,
      email,
      emailNfe,
      paisOrigem,
      codigo,
    });

    return response.json(createClientBling);
  }

  public async list(_: Request, response: Response): Promise<Response> {
    const listUserBlingService = container.resolve(ListUserBlingService);

    const listUserBling = await listUserBlingService.execute();

    return response.json(listUserBling);
  }
}
