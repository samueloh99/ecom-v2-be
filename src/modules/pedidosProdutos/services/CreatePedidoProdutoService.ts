import { injectable, inject } from "tsyringe";

import PedidosProdutos from "@modules/pedidosProdutos/infra/typeorm/models/PedidosProdutos";

import PedidosProdutosRepository from "@modules/pedidosProdutos/infra/typeorm/repositories/PedidosProdutosRepository";
import ICreatePedidoProdutoDTO from "@modules/pedidosProdutos/dtos/ICreatePedidoProdutoDTO";

@injectable()
class CreatePedidosProdutos {
  constructor(
    @inject("PedidosProdutosRepository")
    private pedidosProdutosRepository: PedidosProdutosRepository,
  ) {}

  public async execute({
    pedido_id,
    produto_id,
    sku_id,
    quantidade,
    cancelado,
    troca,
    pontos,
    preco,
    total,
    desconto_id,
    json_pers,
  }: ICreatePedidoProdutoDTO): Promise<PedidosProdutos> {
    const pedidoProduto = await this.pedidosProdutosRepository.create({
      pedido_id,
      produto_id,
      sku_id,
      quantidade,
      cancelado,
      troca,
      pontos,
      preco,
      total,
      desconto_id,
      json_pers,
    });

    return pedidoProduto;
  }
}

export default CreatePedidosProdutos;
