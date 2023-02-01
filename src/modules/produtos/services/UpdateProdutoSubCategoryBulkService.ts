import { injectable, inject } from "tsyringe";

import IProdutosRepository from "@modules/produtos/repositories/IProdutosRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  product_ids: number[];
  categoria_id: number;
}

@injectable()
class UpdateProdutoSubCategoryBulkService {
  constructor(
    @inject("ProdutosRepository")
    private produtosRepository: IProdutosRepository,
  ) {}

  public async execute({ categoria_id, product_ids }: IRequest): Promise<void> {
    if (!product_ids) {
      throw new AppError("Esse produto não existe", 404);
    }

    product_ids.map(async item => {
      const product = await this.produtosRepository.findProdutoById(item);
      if (product) {
        if (product.sub_categorias_ids) {
          if (product.sub_categorias_ids.includes(categoria_id)) {
            return false;
          }

          product.sub_categorias_ids = [
            ...product.sub_categorias_ids,
            categoria_id,
          ];

          return await this.produtosRepository.save(product);
        }

        product.sub_categorias_ids = [categoria_id];
        await this.produtosRepository.save(product);
      }

      return true;
    });
  }
}

export default UpdateProdutoSubCategoryBulkService;
