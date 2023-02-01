import { Request, Response } from "express";

import { container } from "tsyringe";

import CreateOrderBlingService from "@modules/pedidos/services/bling/CreateOrderBlingService";
import ListOrderBlingService from "@modules/pedidos/services/bling/ListOrderBlingService";

export default class PedidosController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      data_pedido,
      numero_pedido,
      numero_loja,
      vlr_frete,
      vlr_desconto,
      obs,
      nome_transportadora,
      nat_operacao,
      tipo,
      loja,
      codigo_cliente,
      nome_cliente,
      tipoPessoa,
      cpf_cnpj,
      rg,
      endereco_cliente,
      numero_cliente,
      complemento_cliente,
      bairro_cliente,
      cidade_cliente,
      uf_cliente,
      cep_cliente,
      fone_cliente,
      email_cliente,
      atualizar_cliente,
      transportadora,
      tipo_frete,
      qtde_volumes_transporte,
      peso_bruto_transporte,
      peso_liquido_transporte,
      servico_correios,
      nome_etiqueta,
      endereco_etiqueta,
      numero_etiqueta,
      complemento_etiqueta,
      bairro_etiqueta,
      municipio_etiqueta,
      uf_etiqueta,
      cep_etiqueta,
      servico,
      codigo_item,
      descricao_item,
      qtde_item,
      vlr_unit_item,
      peso_bruto_item,
      peso_liq_item,
      un_item,
      tipo_item,
      origem_item,
      class_fiscal_item,
      dias_parcela,
      data_parcela,
      vlr_parcela,
      id_pgto,
    } = request.body;

    const createOrderBlingService = container.resolve(CreateOrderBlingService);

    const createNewOrderBling = await createOrderBlingService.execute({
      data_pedido,
      numero_pedido,
      numero_loja,
      vlr_frete,
      vlr_desconto,
      obs,
      nome_transportadora,
      nat_operacao,
      tipo,
      loja,
      codigo_cliente,
      nome_cliente,
      tipoPessoa,
      cpf_cnpj,
      rg,
      endereco_cliente,
      numero_cliente,
      complemento_cliente,
      bairro_cliente,
      cidade_cliente,
      uf_cliente,
      cep_cliente,
      fone_cliente,
      email_cliente,
      atualizar_cliente,
      transportadora,
      tipo_frete,
      qtde_volumes_transporte,
      peso_bruto_transporte,
      peso_liquido_transporte,
      servico_correios,
      nome_etiqueta,
      endereco_etiqueta,
      numero_etiqueta,
      complemento_etiqueta,
      bairro_etiqueta,
      municipio_etiqueta,
      uf_etiqueta,
      cep_etiqueta,
      servico,
      codigo_item,
      descricao_item,
      qtde_item,
      vlr_unit_item,
      peso_bruto_item,
      peso_liq_item,
      un_item,
      tipo_item,
      origem_item,
      class_fiscal_item,
      dias_parcela,
      data_parcela,
      vlr_parcela,
      id_pgto,
    });

    return response.json(createNewOrderBling);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listOrderBlingService = container.resolve(ListOrderBlingService);

    const listAllOrders = await listOrderBlingService.execute();

    return response.json(listAllOrders);
  }
}
