import AppError from "@shared/errors/AppError";
import fetch from "node-fetch";

import ICreateOrderPix from "@shared/container/providers/Pagarme/dtos/Pix/ICreateOrderPix";

import ICreateOrderPixResponse from "@shared/container/providers/Pagarme/dtos/Pix/ICreateOrderPixResponse";

import IGetOrder from "@shared/container/providers/Pagarme/dtos/IGetOrder";

import IPagarmeOrdersProvider from "@shared/container/providers/Pagarme/models/IPagarmeOrdersProvider";

import ICreateOrderBoleto from "@shared/container/providers/Pagarme/dtos/Boleto/ICreateOrderBoleto";
import ICreateOrderBoletoResponse from "@shared/container/providers/Pagarme/dtos/Boleto/ICreateOrderBoletoResponse";

import ICreateOrderCartao from "@shared/container/providers/Pagarme/dtos/Cartao/ICreateOrderCartao";
import ICreateOrderCartaoResponse from "@shared/container/providers/Pagarme/dtos/Cartao/ICreateOrderCartaoResponse";

class PagarmeOrdersProvider implements IPagarmeOrdersProvider {
  constructor() {}

  public async post_cartao({
    customer_id,
    items,
    payments,
    shipping,
    metadata,
  }: ICreateOrderCartao): Promise<ICreateOrderCartaoResponse> {
    const orderPagarme = {
      items,
      customer_id,
      shipping,
      antifraud: {
        type: "clearsale",
        clearsale: {
          custom_sla: "90",
        },
      },
      payments,
      metadata,
    };

    try {
      const url = `https://api.pagar.me/core/v5/orders`;
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
        body: JSON.stringify(orderPagarme),
      };

      const response = await fetch(url, options);
      const data: ICreateOrderCartaoResponse = await response.json();

      return data;
    } catch (err) {
      console.log("CAIU NO ERRO");

      throw new AppError("Pedido não realizado.", 200);
    }
  }

  public async post_boleto({
    customer_id,
    items,
    payments,
    shipping,
    metadata,
  }: ICreateOrderBoleto): Promise<ICreateOrderBoletoResponse> {
    const orderPagarme = {
      items,
      customer_id,
      shipping,
      antifraud: {
        type: "clearsale",
        clearsale: {
          custom_sla: "90",
        },
      },
      payments,
      metadata,
    };

    try {
      const url = `https://api.pagar.me/core/v5/orders`;
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
        body: JSON.stringify(orderPagarme),
      };

      const response = await fetch(url, options);
      const data: ICreateOrderBoletoResponse = await response.json();

      return data;
    } catch (err) {
      console.log("CAIU NO ERRO");

      throw new AppError("Pedido não realizado.", 200);
    }
  }

  public async get(): Promise<IGetOrder> {
    try {
      const url =
        "https://api.pagar.me/core/v5/orders?created_since=2022-10-10";
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
      const data: IGetOrder = await response.json();

      return data;
    } catch (err) {
      console.log(err);

      throw new AppError("Erro ao listar os pedidos.", 200);
    }
  }

  public async post_pix({
    customer_id,
    items,
    payments,
    shipping,
    metadata,
  }: ICreateOrderPix): Promise<ICreateOrderPixResponse> {
    const orderPagarme = {
      items,
      customer_id,
      shipping,
      antifraud: {
        type: "clearsale",
        clearsale: {
          custom_sla: "90",
        },
      },
      payments,
      metadata,
    };

    try {
      const url = `https://api.pagar.me/core/v5/orders`;
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
        body: JSON.stringify(orderPagarme),
      };

      const response = await fetch(url, options);
      const data: ICreateOrderPixResponse = await response.json();

      return data;
    } catch (err) {
      console.log("CAIU NO ERRO");

      throw new AppError("Pedido não realizado.", 200);
    }
  }
}

export default PagarmeOrdersProvider;
