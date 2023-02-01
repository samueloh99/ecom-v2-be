import PedidosProdutos from "@modules/pedidosProdutos/infra/typeorm/models/PedidosProdutos";
import ICreatePedidoProdutoDTO from "@modules/pedidosProdutos/dtos/ICreatePedidoProdutoDTO";
import {
  IResponse,
  IRequest,
} from "@modules/pedidosProdutos/dtos/IListAllPedidosProdutosDTO";

export default interface IPedidosProdutosRepository {
  create(data: ICreatePedidoProdutoDTO): Promise<PedidosProdutos>;
  findByID(id: string): Promise<PedidosProdutos | undefined>;
  list(props: IRequest): Promise<IResponse>;
  listWithoutPagination(): Promise<PedidosProdutos[]>;
}
