import { injectable, inject } from "tsyringe";

import PedidosProdutosRepository from "@modules/pedidosProdutos/infra/typeorm/repositories/PedidosProdutosRepository";

import {
  IResponse,
  IRequest,
} from "@modules/pedidosProdutos/dtos/IListAllPedidosProdutosDTO";

@injectable()
class ListPedidoProdutoService {
  constructor(
    @inject("PedidosProdutosRepository")
    private pedidosProdutosRepository: PedidosProdutosRepository,
  ) {}

  public async execute({
    perPage,
    currentPage,
    compraFim,
    compraInicio,
    fornecedor,
    marca,
    pedidoId,
    produtoId,
    produtoNome,
    skuId,
    skuRef,
  }: IRequest): Promise<IResponse> {
    const all = await this.pedidosProdutosRepository.list({
      perPage,
      currentPage,
      compraFim,
      compraInicio,
      fornecedor,
      marca,
      pedidoId,
      produtoId,
      produtoNome,
      skuId,
      skuRef,
    });

    return all;
  }
}

export default ListPedidoProdutoService;
