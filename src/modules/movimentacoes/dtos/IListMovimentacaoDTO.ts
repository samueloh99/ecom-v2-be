import Movimentacoes from "@modules/movimentacoes/infra/typeorm/models/Movimentacoes";

export interface IResponse {
  movimentacoes: Movimentacoes[];
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
}
