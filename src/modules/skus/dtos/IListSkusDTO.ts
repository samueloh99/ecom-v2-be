import Skus from "@modules/skus/infra/typeorm/models/Skus";

export interface IResponse {
  skus: Skus[];
  pag: {
    paginas: number;
    atual: number;
    encontrados: number;
    exibindo: number;
  };
}

export interface IRequest {
  perPage: number;
  currentPage: number;
  ativos?: string;
  inativos?: string;
  skuCodigo?: string;
  skuReferencia?: string;
  precoVendaOp?: string;
  precoVenda?: string;
  estoqueOp?: string;
  estoque?: string;
  produtoNome?: string;
  produtoCodigo?: string;
  produtoReferencia?: string;
  produtoMarca?: string;
  categoria?: string;
}
