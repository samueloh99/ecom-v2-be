import { injectable, inject } from "tsyringe";

import {
  IListAllPedidosDTO,
  IRequest,
} from "@modules/pedidos/dtos/IListAllPedidosDTO";

import IPedidosRepository from "@modules/pedidos/repositories/IPedidosRepository";

@injectable()
class ListPedidoService {
  constructor(
    @inject("PedidosRepository")
    private pedidosRepository: IPedidosRepository,
  ) {}

  public async execute({
    perPage,
    currentPage,
    clienteEmail,
    clienteGenero,
    clienteId,
    clienteNome,
    cep,
    estado,
    pedidoId,
    temDesconto,
  }: IRequest): Promise<IListAllPedidosDTO> {
    const pedidos = await this.pedidosRepository.list({
      currentPage,
      perPage,
      clienteEmail,
      clienteGenero,
      clienteId,
      clienteNome,
      cep,
      estado,
      pedidoId,
      temDesconto,
    });

    return pedidos;
  }
}

export default ListPedidoService;
