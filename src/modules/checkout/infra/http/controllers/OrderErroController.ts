import { Request, Response } from "express";

import { container } from "tsyringe";

import SendSqsErrorOrderService from "@modules/checkout/services/SendSqsErrorOrderService";

export default class OrderErroController {
  public async send(request: Request, response: Response): Promise<Response> {
    const {
      pedido_geral,
      usuario_id,
      pedido_id,
      usuario_id_pagarme,
      endereco_id,
      forma_pgto,

      parcela_numero,
      card_id_pagarme,
      card_cv,
    } = request.body;

    const sendSqsErrorOrderService = container.resolve(
      SendSqsErrorOrderService,
    );

    const sendSqsErrorOrder = await sendSqsErrorOrderService.execute({
      pedido_geral,
      usuario_id,
      pedido_id,
      usuario_id_pagarme,
      endereco_id,
      forma_pgto,
      parcela_numero,
      card_id_pagarme,
      card_cv,
    });

    return response.json(sendSqsErrorOrder);
  }
}
