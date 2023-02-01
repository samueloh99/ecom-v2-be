import Pedido from "@modules/pedidos/infra/typeorm/models/Pedidos";
import ICreatePedidoDTO from "@modules/pedidos/dtos/ICreatePedidoDTO";
import {
  IListAllPedidosDTO,
  IRequest,
} from "@modules/pedidos/dtos/IListAllPedidosDTO";
export default interface IPedidosRepository {
  create(data: ICreatePedidoDTO): Promise<Pedido>;
  listWithoutPagination(): Promise<Pedido[]>;
  list(props: IRequest): Promise<IListAllPedidosDTO>;
  findById(id: number): Promise<Pedido | undefined>;
  findByUserId(id: number): Promise<Pedido[]>;
  save(pedido: Pedido): Promise<Pedido>;
}
