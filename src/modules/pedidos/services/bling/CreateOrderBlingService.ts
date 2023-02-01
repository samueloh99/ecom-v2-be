import { injectable, inject } from "tsyringe";

import IBlingOrdersProvider from "@shared/container/providers/BlingERP/models/IBlingOrdersProvider";

interface IRequest {
  data_pedido: Date;
  numero_pedido: string;
  numero_loja: string;
  vlr_frete: number;
  vlr_desconto: number;
  obs: string;
  nome_transportadora: string;
  nat_operacao: string;
  tipo: string;
  loja: string;
  codigo_cliente: string;
  nome_cliente: string;
  tipoPessoa: string;
  cpf_cnpj: string;
  rg: string;
  endereco_cliente: string;
  numero_cliente: string;
  complemento_cliente: string;
  bairro_cliente: string;
  cidade_cliente: string;
  uf_cliente: string;
  cep_cliente: string;
  fone_cliente: string;
  email_cliente: string;
  atualizar_cliente: string;
  transportadora: string;
  tipo_frete: string;
  qtde_volumes_transporte: number;
  peso_bruto_transporte: number;
  peso_liquido_transporte: number;
  servico_correios: string;
  nome_etiqueta: string;
  endereco_etiqueta: string;
  numero_etiqueta: string;
  complemento_etiqueta: string;
  bairro_etiqueta: string;
  municipio_etiqueta: string;
  uf_etiqueta: string;
  cep_etiqueta: string;
  servico: string;
  codigo_item: string;
  descricao_item: string;
  qtde_item: number;
  vlr_unit_item: number;
  peso_bruto_item: number;
  peso_liq_item: number;
  un_item: string;
  tipo_item: string;
  origem_item: number;
  class_fiscal_item: string;
  dias_parcela: string;
  data_parcela: Date;
  vlr_parcela: number;
  id_pgto: string;
}

@injectable()
class CreateOrderBlingService {
  constructor(
    @inject("BlingOrdersProvider")
    private blingOrdersProvider: IBlingOrdersProvider,
  ) {}

  public async execute({
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
  }: IRequest): Promise<void> {
    const pedido = {
      data: data_pedido,
      numero: numero_pedido,
      numero_loja,
      vlr_frete,
      vlr_desconto,
      obs,
      nome_transportadora,
      nat_operacao,
      tipo,
      loja,
      cliente: {
        codigo: codigo_cliente,
        nome: nome_cliente,
        tipoPessoa,
        cpf_cnpj,
        rg,
        endereco: endereco_cliente,
        numero: numero_cliente,
        complemento: complemento_cliente,
        bairro: bairro_cliente,
        cidade: cidade_cliente,
        uf: uf_cliente,
        cep: cep_cliente,
        fone: fone_cliente,
        email: email_cliente,
        atualizar_cliente,
      },
      transporte: {
        transportadora,
        tipo_frete,
        qtde_volumes: qtde_volumes_transporte,
        peso_bruto: peso_bruto_transporte,
        peso_liquido: peso_liquido_transporte,
        servico_correios,
        dados_etiquetas: {
          nome: nome_etiqueta,
          endereco: endereco_etiqueta,
          numero: numero_etiqueta,
          complemento: complemento_etiqueta,
          bairro: bairro_etiqueta,
          municipio: municipio_etiqueta,
          uf: uf_etiqueta,
          cep: cep_etiqueta,
        },
      },
      volumes: {
        volume: {
          servico,
        },
      },
      itens: {
        item: {
          codigo: codigo_item,
          descricao: descricao_item,
          qtde: qtde_item,
          vlr_unit: vlr_unit_item,
          peso_bruto: peso_bruto_item,
          peso_liq: peso_liq_item,
          un: un_item,
          tipo: tipo_item,
          origem: origem_item,
          class_fiscal: class_fiscal_item,
        },
      },
      parcelas: {
        parcela: {
          dias: dias_parcela,
          data: data_parcela,
          vlr: vlr_parcela,
          forma_pagamento: {
            id: id_pgto,
          },
        },
      },
    };

    const newPedido = await this.blingOrdersProvider.postOrder(pedido);

    return newPedido;
  }
}

export default CreateOrderBlingService;
