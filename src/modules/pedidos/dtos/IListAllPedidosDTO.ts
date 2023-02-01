import Pedido from "@modules/pedidos/infra/typeorm/models/Pedidos";

export interface IListAllPedidosDTO {
  pedidos: Pedido[];
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
  clienteNome?: string;
  clienteId?: string;
  clienteEmail?: string;
  clienteGenero?: string;
  cep?: string;
  estado?: string;
  temDesconto?: string;
}
