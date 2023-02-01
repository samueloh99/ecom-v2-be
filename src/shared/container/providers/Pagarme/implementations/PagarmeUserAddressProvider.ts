import AppError from "@shared/errors/AppError";
import fetch from "node-fetch";

import ICreateUserAddress from "@shared/container/providers/Pagarme/dtos/Address/ICreateUserAddress";
import ICreateUserAddressResponse from "@shared/container/providers/Pagarme/dtos/Address/ICreateUserAddressResponse";

import IGetUserAddressResponse from "@shared/container/providers/Pagarme/dtos/Address/IGetUserAddressResponse";

import IPagarmeUserAddressProvider from "@shared/container/providers/Pagarme/models/IPagarmeUserAddressProvider";

class PagarmeUserAddressProvider implements IPagarmeUserAddressProvider {
  constructor() {}

  public async getByCustomerId(
    customer_id: string,
  ): Promise<IGetUserAddressResponse> {
    try {
      const url = `https://api.pagar.me/core/v5/customers/${customer_id}/addresses`;
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
      let data: IGetUserAddressResponse = await response.json();

      return data;
    } catch (err) {
      console.log("CAIU NO ERRO");

      throw new AppError("Erro ao listar os endereços.", 200);
    }
  }

  public async post({
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
  }: ICreateUserAddress): Promise<ICreateUserAddressResponse> {
    const addressClientPagarme = {
      line_1: `${numero}, ${endereco}, ${bairro}`,
      line_2: complemento,
      zip_code: cep,
      city: cidade,
      state: estado,
      country: "BR",
      metadata: {
        destinatario,
        referencia,
      },
    };

    try {
      const url = `https://api.pagar.me/core/v5/customers/${customer_id}/addresses`;
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
        body: JSON.stringify(addressClientPagarme),
      };

      const response = await fetch(url, options);
      const data: ICreateUserAddressResponse = await response.json();

      return data;
    } catch (err) {
      console.log(err);
      throw new AppError("Cadastro não realizado.", 200);
    }
  }
}

export default PagarmeUserAddressProvider;
