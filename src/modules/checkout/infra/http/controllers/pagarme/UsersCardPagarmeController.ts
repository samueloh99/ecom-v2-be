import { Request, Response } from "express";

import { container } from "tsyringe";

import CreateUserCardPagarmeService from "@modules/checkout/services/pagarme/CreateUserCardPagarmeService";

export default class UsersCardPagarmeController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      number,
      holder_name,
      holder_document,
      exp_month,
      exp_year,
      cvv,
      billing_address,
      brand,
      label,
      customer_id,
    } = request.body;

    const createUserCardPagarmeService = container.resolve(
      CreateUserCardPagarmeService,
    );

    const createUserCardPagarme = await createUserCardPagarmeService.execute({
      billing_address,
      brand,
      customer_id,
      cvv,
      exp_month,
      exp_year,
      holder_document,
      holder_name,
      label,
      number,
    });

    return response.json(createUserCardPagarme);
  }
}
