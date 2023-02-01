import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import PagarmeUserCardProvider from "@shared/container/providers/Pagarme/implementations/PagarmeUserCardProvider";

import ICreateCartao from "@shared/container/providers/Pagarme/dtos/Cartao/ICreateCartao";
import ICreateCartaoResponse from "@shared/container/providers/Pagarme/dtos/Cartao/ICreateCartaoResponse";

@injectable()
class CreateUserCardPagarmeService {
  constructor(
    @inject("PagarmeUserCardProvider")
    private pagarmeUserCardProvider: PagarmeUserCardProvider,
  ) {}

  public async execute({
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
  }: ICreateCartao): Promise<ICreateCartaoResponse> {
    if (!customer_id) {
      throw new AppError("Customer Id Pagarme não encontrado.", 404);
    }

    const cardPagarme = await this.pagarmeUserCardProvider.post({
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

    if (
      cardPagarme.errors &&
      cardPagarme.errors.card[0] ===
        "The number field is not a valid card number"
    ) {
      throw new AppError("Número do cartão inválido.", 203);
    }

    if (cardPagarme.errors && cardPagarme.errors.card[0] === "Card expired.") {
      throw new AppError("Validade do cartão expirado.", 203);
    }

    return cardPagarme;
  }
}

export default CreateUserCardPagarmeService;
