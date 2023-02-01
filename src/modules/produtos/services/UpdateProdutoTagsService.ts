import { injectable, inject } from "tsyringe";

import IProdutosRepository from "@modules/produtos/repositories/IProdutosRepository";
import AppError from "@shared/errors/AppError";
import Produto from "../infra/typeorm/models/Produtos";

interface IRequest {
  id: number;
  tags: number[];
}

@injectable()
class UpdateProdutoTagsService {
  constructor(
    @inject("ProdutosRepository")
    private produtosRepository: IProdutosRepository,
  ) {}

  public async execute({ id, tags }: IRequest): Promise<Produto> {
    const findProdutoById = await this.produtosRepository.findProdutoById(id);

    if (!findProdutoById) {
      throw new AppError("Esse produto não existe");
    }

    findProdutoById.tags = tags;

    await this.produtosRepository.save(findProdutoById);

    return findProdutoById;
  }
}

export default UpdateProdutoTagsService;
