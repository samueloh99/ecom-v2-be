import Produtos from "@modules/produtos/infra/typeorm/models/Produtos";

export interface IResponse {
  produtos: Produtos[];
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
  codigo?: string;
  nome?: string;
  referencia?: string;
  ncm?: string;
  fornecedor?: string;
  marca?: string;
  cadastroInicio?: string;
  cadastroFim?: string;
  categorias?: string;
}
