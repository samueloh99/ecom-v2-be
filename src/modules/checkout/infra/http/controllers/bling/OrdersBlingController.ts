import { Request, Response } from "express";

import { container } from "tsyringe";

import CreateOrderBlingService from "@modules/checkout/services/bling/CreateOrderBlingService";

export default class OrdersBlingController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      numero,
      vlr_frete,
      vlr_desconto,
      obs,
      nome_transportadora,
      cliente_codigo,
      cliente_nome,
      cliente_tipoPessoa,
      cliente_cpf_cnpj,
      cliente_endereco,
      cliente_numero,
      cliente_complemento,
      cliente_bairro,
      cliente_cidade,
      cliente_uf,
      cliente_cep,
      cliente_fone,
      cliente_email,
      transporte_transportadora,
      transporte_tipo_frete,
      transporte_qtde_volumes,
      transporte_peso_bruto,
      transporte_peso_liquido,
      transporte_servico_correios,
      dados_etiquetas_nome,
      dados_etiquetas_endereco,
      dados_etiquetas_numero,
      dados_etiquetas_complemento,
      dados_etiquetas_bairro,
      dados_etiquetas_municipio,
      dados_etiquetas_uf,
      dados_etiquetas_cep,
      volume_servico,
      itens,
      parcela_dias,
      parcela_vlr,
    } = request.body;

    const createOrderBlingService = container.resolve(CreateOrderBlingService);

    const createOrderBling = await createOrderBlingService.execute({
      numero,
      vlr_frete,
      vlr_desconto,
      obs,
      nome_transportadora,
      cliente_codigo,
      cliente_nome,
      cliente_tipoPessoa,
      cliente_cpf_cnpj,
      cliente_endereco,
      cliente_numero,
      cliente_complemento,
      cliente_bairro,
      cliente_cidade,
      cliente_uf,
      cliente_cep,
      cliente_fone,
      cliente_email,
      transporte_transportadora,
      transporte_tipo_frete,
      transporte_qtde_volumes,
      transporte_peso_bruto,
      transporte_peso_liquido,
      transporte_servico_correios,
      dados_etiquetas_nome,
      dados_etiquetas_endereco,
      dados_etiquetas_numero,
      dados_etiquetas_complemento,
      dados_etiquetas_bairro,
      dados_etiquetas_municipio,
      dados_etiquetas_uf,
      dados_etiquetas_cep,
      volume_servico,
      itens,
      parcela_dias,
      parcela_vlr,
    });

    return response.json(createOrderBling);
  }
}
