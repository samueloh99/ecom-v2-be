export default interface ICreateOrder {
  numero: string;
  vlr_frete: number;
  vlr_desconto: number;
  obs: string;
  nome_transportadora: string;
  cliente: {
    codigo: string;
    nome: string;
    tipoPessoa: string;
    cpf_cnpj: string;
    endereco: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
    fone: string;
    email: string;
  };
  transporte: {
    transportadora: string;
    tipo_frete: string;
    qtde_volumes: number;
    peso_bruto: number;
    peso_liquido: number;
    servico_correios: string;
    dados_etiquetas: {
      nome: string;
      endereco: string;
      numero: string;
      complemento: string;
      bairro: string;
      municipio: string;
      uf: string;
      cep: string;
    };
  };
  volumes: {
    volume: {
      servico: string;
    };
  };
  itens: {
    item: {
      codigo: string;
      descricao: string;
      qtde: number;
      vlr_unit: number;
    }[];
  };
  parcelas: {
    parcela: {
      dias: number;
      vlr: number;
    };
  };
}
