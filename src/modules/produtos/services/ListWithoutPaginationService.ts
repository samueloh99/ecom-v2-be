import { injectable, inject } from "tsyringe";

import IProdutosRepository from "@modules/produtos/repositories/IProdutosRepository";
import Produto from "@modules/produtos/infra/typeorm/models/Produtos";

@injectable()
class ListWithoutPaginationService {
  constructor(
    @inject("ProdutosRepository")
    private produtosRepository: IProdutosRepository,
  ) {}

  public async execute(): Promise<Produto[]> {
    const produtos = await this.produtosRepository.listWithoutPagination();

    return produtos;
  }
}

export default ListWithoutPaginationService;
