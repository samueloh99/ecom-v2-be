import { Request, Response } from "express";

import { container } from "tsyringe";

import CreateOrderCartaoPagarmeService from "@modules/checkout/services/pagarme/CreateOrderCartaoPagarmeService";
import CreateOrderPixPagarmeService from "@modules/checkout/services/pagarme/CreateOrderPixPagarmeService";
import CreateOrderBoletoPagarmeService from "@modules/checkout/services/pagarme/CreateOrderBoletoPagarmeService";
import ListOrderPagarmeService from "@modules/checkout/services/pagarme/ListOrderPagarmeService";

export default class OrdersPagarmeController {
  public async create_pix(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const {
      pedido_geral,
      usuario_id,
      usuario_id_pagarme,
      endereco_id,
      pedido_id,
    } = request.body;

    const createOrderPixPagarmeService = container.resolve(
      CreateOrderPixPagarmeService,
    );

    const createUserPagarme = await createOrderPixPagarmeService.execute({
      pedido_geral,
      usuario_id,
      usuario_id_pagarme,
      endereco_id,
      pedido_id,
    });

    return response.json(createUserPagarme);
  }

  public async create_boleto(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const {
      pedido_geral,
      usuario_id,
      usuario_id_pagarme,
      endereco_id,
      pedido_id,
    } = request.body;

    const createOrderBoletoPagarmeService = container.resolve(
      CreateOrderBoletoPagarmeService,
    );

    const createOrderBoletoPagarme =
      await createOrderBoletoPagarmeService.execute({
        pedido_geral,
        usuario_id,
        usuario_id_pagarme,
        endereco_id,
        pedido_id,
      });

    return response.json(createOrderBoletoPagarme);
  }

  public async create_cartao(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const {
      pedido_geral,
      usuario_id,
      usuario_id_pagarme,
      endereco_id,
      pedido_id,
      card_id_pagarme,
      parcela_numero,
      card_cv,
      operation_type,
    } = request.body;

    const createOrderCartaoPagarmeService = container.resolve(
      CreateOrderCartaoPagarmeService,
    );

    const createOrderCartaoPagarme =
      await createOrderCartaoPagarmeService.execute({
        pedido_geral,
        usuario_id,
        usuario_id_pagarme,
        endereco_id,
        pedido_id,
        card_id_pagarme,
        parcela_numero,
        card_cv,
        operation_type,
      });

    return response.json(createOrderCartaoPagarme);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listOrderPagarmeService = container.resolve(ListOrderPagarmeService);

    const ListOrderPagarme = await listOrderPagarmeService.execute();

    return response.json(ListOrderPagarme);
  }
}
