import { Request, Response } from "express";

import { container } from "tsyringe";

import CreateOrderService from "@modules/pedidos/services/CreatePedidoService";
import ListPedidoService from "@modules/pedidos/services/ListPedidoService";

export default class PedidosController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      pedido_tipo,
      pedido_peso,
      pedido_qtde,
      pedido_prazo,
      pedido_desconto,
      pedido_carteira,
      pedido_total,
      pedido_geral,
      pedido_cancelado,
      usuario_id,
      usuario_id_pagarme,
      endereco_id,
      frete_nome,
      frete_titulo,
      frete_prazo,
      frete_valor,
      frete_embalagem,
      pagamento_nome,
      pagamento_titulo,
      pagamento_valor,
      pagamento_link,
      desconto_id,
      parcela_numero,
      parcela_valor,
      parcela_desconto,
      cartao_nsu,
      cartao_bandeira,
      status_entrega,
      status_pagamento,
      utm_campaign,
      utm_source,
      utm_medium,
      utm_content,
      utm_term,
      data_aprovado,
      data_entrega,
      produtos,
      card_id_pagarme,
    } = request.body;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({
      pedido_tipo,
      pedido_peso,
      pedido_qtde,
      pedido_prazo,
      pedido_desconto,
      pedido_carteira,
      pedido_total,
      pedido_geral,
      pedido_cancelado,
      usuario_id,
      usuario_id_pagarme,
      card_id_pagarme,
      endereco_id,
      frete_nome,
      frete_titulo,
      frete_prazo,
      frete_valor,
      frete_embalagem,
      pagamento_nome,
      pagamento_titulo,
      pagamento_valor,
      pagamento_link,
      desconto_id,
      parcela_numero,
      parcela_valor,
      parcela_desconto,
      cartao_nsu,
      cartao_bandeira,
      status_entrega,
      status_pagamento,
      utm_campaign,
      utm_source,
      utm_medium,
      utm_content,
      utm_term,
      data_aprovado,
      data_entrega,
      produtos,
    });

    return response.json(order);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const {
      atual,
      mostrar,
      pedidoId,
      clienteNome,
      clienteId,
      clienteEmail,
      clienteGenero,
      cep,
      estado,
      temDesconto,
    } = request.query;

    const createPedido = container.resolve(ListPedidoService);

    const all = await createPedido.execute({
      perPage: parseInt(mostrar as string),
      currentPage: parseInt(atual as string),
      clienteNome: clienteNome as string,
      clienteId: clienteId as string,
      clienteEmail: clienteEmail as string,
      clienteGenero: clienteGenero as string,
      cep: cep as string,
      estado: estado as string,
      temDesconto: temDesconto as string,
      pedidoId: pedidoId as string,
    });

    return response.json(all);
  }
}
