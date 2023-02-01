export interface ICreateCategoryResponse {
  retorno: {
    categorias: [
      [
        {
          categoria: {
            id: number;
            descricao: string;
            idCategoriaPai: number;
          };
        },
      ],
    ];
  };
}

export interface IGetCategoryResponse {
  retorno: {
    categorias: [
      {
        categoria: {
          id: number;
          descricao: string;
          idCategoriaPai: number;
        };
      },
    ];
  };
}

export interface ICreateProductResponse {
  retorno: {
    erros?: [{ erro: { cod: number; msg: string } }];
    produtos: {
      codigo: string;
      descricao: string;
      descricaoCurta: string;
      descricaoComplementar: string;
      un: string;
      vlr_unit: number;
      preco_custo: number;
      peso_bruto: number;
      peso_liq: number;
      origem: string;
      marca: string;
      largura: string;
      altura: string;
      profundidade: string;
      unidadeMedida: string;
      idCategoria: number;
      variacoes: {
        variacao: {
          nome: string;
          codigo: string;
          vlr_unit: number;
          clonarDadosPai: string;
          deposito: {
            id: number;
            estoque: number;
          };
        };
      };
      urlVideo: string;
    }[];
  };
}

export interface ICreateClientResponse {
  retorno: {
    erros?: [{ erro: { cod: number; msg: string } }];
    contatos: {
      nome: string;
      fantasia: string;
      tipoPessoa: string; //F, J ou E
      contribuinte: string;
      cpf_cnpj: string;
      ie_rg: string;
      endereco: string;
      numero: string;
      complemento: string;
      bairro: string;
      cep: string;
      cidade: string;
      uf: string;
      fone: string;
      celular: string;
      email: string;
      emailNfe: string;
      informacaoContato: string;
      limiteCredito: number;
      paisOrigem: string;
      codigo: string;
      site: string;
    }[];
  };
}

export interface ICreateOrderResponse {
  retorno: {
    erros?: [{ erro: { cod: number; msg: string } }];
    pedidos: [
      {
        pedido: {
          numero: string;
          idPedido: number;
          codigos_rastreamento: {
            codigo_rastreamento: string;
          };
          volumes: [
            {
              volume: {
                servico: string;
                codigoRastreamento: string;
              };
            },
            {
              volume: {
                servico: string;
                codigoRastreamento: string;
              };
            },
          ];
        };
      },
    ];
  };
}
