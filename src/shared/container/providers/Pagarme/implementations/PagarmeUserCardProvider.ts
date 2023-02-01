import AppError from "@shared/errors/AppError";
import fetch from "node-fetch";

import IPagarmeUserCardProvider from "@shared/container/providers/Pagarme/models/IPagarmeUserCardProvider";

import ICreateCartao from "@shared/container/providers/Pagarme/dtos/Cartao/ICreateCartao";
import ICreateCartaoResponse from "@shared/container/providers/Pagarme/dtos/Cartao/ICreateCartaoResponse";
import IGetUserCardsResponse from "@shared/container/providers/Pagarme/dtos/Cartao/IGetUserCardsResponse";

class PagarmeUserCardProvider implements IPagarmeUserCardProvider {
  constructor() {}

  public async getByCustomerId(
    customer_id: string,
  ): Promise<IGetUserCardsResponse> {
    try {
      const url = `https://api.pagar.me/core/v5/customers/${customer_id}/cards`;
      const options = {
        method: "GET",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(process.env.PAGARME_SECRET_KEY as string).toString(
              "base64",
            ),
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(url, options);
      const data: IGetUserCardsResponse = await response.json();

      return data;
    } catch (err) {
      console.log("CAIU NO ERRO");

      throw new AppError("Erro ao listar Cartões.", 200);
    }
  }

  public async post({
    billing_address,
    brand,
    cvv,
    exp_month,
    exp_year,
    holder_document,
    holder_name,
    label,
    number,
    customer_id,
  }: ICreateCartao): Promise<ICreateCartaoResponse> {
    const newCard = {
      number,
      holder_name,
      holder_document,
      exp_month,
      exp_year,
      cvv,
      brand,
      options: {
        verify_card: true,
      },
      label,
      billing_address,
    };

    try {
      const url = `https://api.pagar.me/core/v5/customers/${customer_id}/cards`;
      const options = {
        method: "POST",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(process.env.PAGARME_SECRET_KEY as string).toString(
              "base64",
            ),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCard),
      };

      const response = await fetch(url, options);
      const data: ICreateCartaoResponse = await response.json();

      return data;
    } catch (err) {
      console.log(err);
      throw new AppError("Cadastro do Cartão não realizado.", 406);
    }
  }
}

export default PagarmeUserCardProvider;
