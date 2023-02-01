import CreateMovimentacaoService from "@modules/movimentacoes/services/CreateMovimentacaoService";
import ListMovimentacoesService from "@modules/movimentacoes/services/ListMovimentacoesService";
import { Request, Response } from "express";

import { container } from "tsyringe";

export default class MovimentacoesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { quantidade, lancamento, sku_id, localizacao } = request.body;

    const createMovimentacao = container.resolve(CreateMovimentacaoService);

    const movimentacao = await createMovimentacao.execute({
      quantidade,
      lancamento,
      sku_id,
      localizacao,
    });

    return response.json(movimentacao);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const { atual, mostrar } = request.query;

    const getMovimentacoes = container.resolve(ListMovimentacoesService);

    const all = await getMovimentacoes.execute({
      perPage: parseInt(mostrar as string),
      currentPage: parseInt(atual as string),
    });

    return response.json(all);
  }
}
