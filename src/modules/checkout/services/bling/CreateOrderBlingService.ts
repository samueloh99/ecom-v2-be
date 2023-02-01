import { injectable, inject } from "tsyringe";

import IBlingOrdersProvider from "@shared/container/providers/BlingERP/models/IBlingOrdersProvider";
import { ICreateOrderResponse } from "@shared/container/providers/BlingERP/dtos/IBlingERPResponses";

type IRequest = {
  numero: string;
  vlr_frete: number;
  vlr_desconto: number;
  obs: string;
  nome_transportadora: string;
  cliente_codigo: string;
  cliente_nome: string;
  cliente_tipoPessoa: string;
  cliente_cpf_cnpj: string;
  cliente_endereco: string;
  cliente_numero: string;
  cliente_complemento: string;
  cliente_bairro: string;
  cliente_cidade: string;
  cliente_uf: string;
  cliente_cep: string;
  cliente_fone: string;
  cliente_email: string;
  transporte_transportadora: string;
  transporte_tipo_frete: string;
  transporte_qtde_volumes: number;
  transporte_peso_bruto: number;
  transporte_peso_liquido: number;
  transporte_servico_correios: string;
  dados_etiquetas_nome: string;
  dados_etiquetas_endereco: string;
  dados_etiquetas_numero: string;
  dados_etiquetas_complemento: string;
  dados_etiquetas_bairro: string;
  dados_etiquetas_municipio: string;
  dados_etiquetas_uf: string;
  dados_etiquetas_cep: string;
  volume_servico: string;
  itens: {
    idProd: number;
    nome: string;
    sku_referencia: string;
    referencia: string;
    ncm: string;
    variante1: string;
    variante2: string;
    foto: string;
    quantidade: number;
    preco: number;
    idSku: number;
    peso: number;
  }[];
  parcela_dias: number;
  parcela_vlr: number;
};

@injectable()
class CreateOrderBlingService {
  constructor(
    @inject("BlingOrdersProvider")
    private blingOrdersProvider: IBlingOrdersProvider,
  ) {}

  public async execute({
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
  }: IRequest): Promise<ICreateOrderResponse> {
    const newOrderBlingObj = {
      numero,
      vlr_frete,
      vlr_desconto,
      obs,
      nome_transportadora,
      cliente: {
        codigo: cliente_codigo,
        nome: cliente_nome,
        tipoPessoa: cliente_tipoPessoa,
        cpf_cnpj: cliente_cpf_cnpj,
        endereco: cliente_endereco,
        numero: cliente_numero,
        complemento: cliente_complemento,
        bairro: cliente_bairro,
        cidade: cliente_cidade,
        uf: cliente_uf,
        cep: cliente_cep,
        fone: cliente_fone,
        email: cliente_email,
      },
      transporte: {
        transportadora: transporte_transportadora,
        tipo_frete: transporte_tipo_frete,
        qtde_volumes: transporte_qtde_volumes,
        peso_bruto: transporte_peso_bruto,
        peso_liquido: transporte_peso_liquido,
        servico_correios: transporte_servico_correios,
        dados_etiquetas: {
          nome: dados_etiquetas_nome,
          endereco: dados_etiquetas_endereco,
          numero: dados_etiquetas_numero,
          complemento: dados_etiquetas_complemento,
          bairro: dados_etiquetas_bairro,
          municipio: dados_etiquetas_municipio,
          uf: dados_etiquetas_uf,
          cep: dados_etiquetas_cep,
        },
      },
      volumes: {
        volume: {
          servico: volume_servico,
        },
      },
      itens: {
        item: itens.map(item => {
          return {
            codigo: item.sku_referencia,
            descricao: item.nome,
            qtde: item.quantidade,
            vlr_unit: item.preco,
          };
        }),
      },

      parcelas: {
        parcela: {
          dias: parcela_dias,
          vlr: parcela_vlr,
        },
      },
    };

    const pedido = await this.blingOrdersProvider.post(newOrderBlingObj);

    return pedido;
  }
}

export default CreateOrderBlingService;
