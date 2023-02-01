import { container } from "tsyringe";

import { Request, Response } from "express";

import CreatePedidosProdutosService from "@modules/pedidosProdutos/services/CreatePedidoProdutoService";
import ListPedidoProdutoService from "@modules/pedidosProdutos/services/ListPedidoProdutoService";

export default class PedidosProdutosController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
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
    } = request.body;

    const createPedidosProdutos = container.resolve(
      CreatePedidosProdutosService,
    );

    const pedidoProduto = await createPedidosProdutos.execute({
      pedido_id,
      produto_id,
      sku_id,
      quantidade,
      cancelado,
      troca,
      desconto_id,
      pontos,
      preco,
      total,
      json_pers,
    });

    return response.json(pedidoProduto);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const {
      atual,
      mostrar,
      pedidoId,
      compraInicio,
      compraFim,
      produtoId,
      produtoNome,
      skuId,
      skuRef,
      fornecedor,
      marca,
    } = request.query;

    const listPedidoProdutoService = container.resolve(
      ListPedidoProdutoService,
    );

    const allPedidosProdutos = await listPedidoProdutoService.execute({
      perPage: parseInt(mostrar as string),
      currentPage: parseInt(atual as string),
      pedidoId: pedidoId as string,
      compraInicio: compraInicio as string,
      compraFim: compraFim as string,
      produtoId: produtoId as string,
      produtoNome: produtoNome as string,
      skuId: skuId as string,
      skuRef: skuRef as string,
      fornecedor: fornecedor as string,
      marca: marca as string,
    });

    return response.json(allPedidosProdutos);
  }
}
