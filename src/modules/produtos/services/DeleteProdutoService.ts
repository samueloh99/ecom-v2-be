import { injectable, inject } from "tsyringe";

import { DeleteResult } from "typeorm";

import IProdutosRepository from "@modules/produtos/repositories/IProdutosRepository";
import AppError from "@shared/errors/AppError";
import ISkusRepository from "@modules/skus/repositories/ISkusRepository";

@injectable()
class DeleteProdutoService {
  constructor(
    @inject("ProdutosRepository")
    private produtosRepository: IProdutosRepository,

    @inject("SkusRepository")
    private skusRepository: ISkusRepository
  ) {}

  public async execute(id: number): Promise<DeleteResult> {
    const checkIfProdutoExists = await this.produtosRepository.findProdutoById(
      id
    );

    const checkIfExistsSkusWithProduct =
      await this.skusRepository.findByProdutoId(id);

    if (
      checkIfExistsSkusWithProduct &&
      checkIfExistsSkusWithProduct?.length > 0
    ) {
      throw new AppError("Existe Sku vinculado a este Produto.");
    }

    if (!checkIfProdutoExists) {
      throw new AppError("Sku ID não existe.");
    }
    const findProdutoAndDelete =
      await this.produtosRepository.deleteProdutoById(id);

    return findProdutoAndDelete;
  }
}

export default DeleteProdutoService;
