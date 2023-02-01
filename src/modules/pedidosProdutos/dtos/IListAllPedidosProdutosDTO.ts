import PedidosProdutos from "@modules/pedidosProdutos/infra/typeorm/models/PedidosProdutos";

export interface IResponse {
  pedidosProdutos: PedidosProdutos[];
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
  pedidoId?: string;
  compraInicio?: string;
  compraFim?: string;
  produtoId?: string;
  produtoNome?: string;
  skuId?: string;
  skuRef?: string;
  fornecedor?: string;
  marca?: string;
}
