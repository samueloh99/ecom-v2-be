import { injectable, inject } from "tsyringe";

import Produto from "@modules/produtos/infra/typeorm/models/Produtos";

import IProdutosRepository from "@modules/produtos/repositories/IProdutosRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: number;
  sub_categorias_ids: number[];
}

@injectable()
class UpdateProdutoSubCategoryService {
  constructor(
    @inject("ProdutosRepository")
    private produtosRepository: IProdutosRepository,
  ) {}

  public async execute({ id, sub_categorias_ids }: IRequest): Promise<Produto> {
    const findProdutoById = await this.produtosRepository.findProdutoById(id);

    if (!findProdutoById) {
      throw new AppError("Esse produto não existe");
    }

    findProdutoById.sub_categorias_ids = sub_categorias_ids;

    await this.produtosRepository.save(findProdutoById);

    return findProdutoById;
  }
}

export default UpdateProdutoSubCategoryService;
