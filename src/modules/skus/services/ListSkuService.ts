import { injectable, inject } from "tsyringe";

import ISkusRepository from "@modules/skus/repositories/ISkusRepository";
import AppError from "@shared/errors/AppError";

import { IRequest, IResponse } from "@modules/skus/dtos/IListSkusDTO";

@injectable()
class ListSkuService {
  constructor(
    @inject("SkusRepository")
    private skusRepository: ISkusRepository,
  ) {}

  public async execute({
    currentPage,
    perPage,
    ativos,
    inativos,
    skuCodigo,
    skuReferencia,
    precoVendaOp,
    precoVenda,
    estoqueOp,
    estoque,
    produtoNome,
    produtoCodigo,
    produtoReferencia,
    produtoMarca,
    categoria,
  }: IRequest): Promise<IResponse> {
    const all = await this.skusRepository.list({
      currentPage,
      perPage,
      ativos,
      inativos,
      skuCodigo,
      skuReferencia,
      precoVendaOp,
      precoVenda,
      estoqueOp,
      estoque,
      produtoNome,
      produtoCodigo,
      produtoReferencia,
      produtoMarca,
      categoria,
    });

    if (!all) {
      throw new AppError("Skus não encontrados.");
    }

    return all;
  }
}

export default ListSkuService;
