import { injectable, inject } from "tsyringe";

import ISkusRepository from "@modules/skus/repositories/ISkusRepository";
import IDescontosRepository from "@modules/produtos/repositories/IDescontosRepository";
import Skus from "@modules/skus/infra/typeorm/models/Skus";
import AppError from "@shared/errors/AppError";

@injectable()
class SearchSkuIdService {
  constructor(
    @inject("SkusRepository")
    private skusRepository: ISkusRepository,

    @inject("DescontosRepository")
    private descontosRepository: IDescontosRepository,
  ) {}

  public async execute({ id }: { id: number }): Promise<Skus> {
    const sku = await this.skusRepository.findSkuById(id);

    const descontos = await this.descontosRepository.list();

    const dateFormated = new Date(Date.now());

    if (!sku) {
      throw new AppError("Skus não encontrado.", 404);
    }

    const produtoDesconto = descontos.find(
      desconto => desconto.produto_id === sku.produto_id,
    );

    const validateDesconto =
      produtoDesconto !== undefined &&
      dateFormated > produtoDesconto.data_desconto_1 &&
      dateFormated < produtoDesconto.data_desconto_2 &&
      produtoDesconto;

    const desconto =
      validateDesconto !== false
        ? {
            tipo: validateDesconto.desconto_tipo,
            valor: validateDesconto.desconto_valor,
          }
        : {
            tipo: 0,
            valor: 0,
          };

    const preco_desconto =
      validateDesconto !== false &&
      (validateDesconto.desconto_tipo === 1
        ? sku.preco_venda - validateDesconto.desconto_valor
        : sku.preco_venda -
          sku.preco_venda * (validateDesconto.desconto_valor / 100));

    const newSkus = {
      ...sku,
      preco_desconto: preco_desconto === false ? 0 : preco_desconto,
      desconto,
    };

    return newSkus;
  }
}

export default SearchSkuIdService;
