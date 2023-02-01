import { injectable, inject } from "tsyringe";

import ISkusRepository from "@modules/skus/repositories/ISkusRepository";
import Skus from "@modules/skus/infra/typeorm/models/Skus";
import AppError from "@shared/errors/AppError";
import IVariacoesRepository from "@modules/variacoes/repositories/IVariacoesRepository";

interface IRequest {
  id: number;
  var1_id: number;
  var2_id: number;
  ativo: number;
  referencia: string;
  preco_custo: number;
  preco_venda: number;
  produto_id: number;
  peso: number;
  gtin: string;
  mpn: string;
}

@injectable()
class UpdateSkuService {
  constructor(
    @inject("SkusRepository")
    private skusRepository: ISkusRepository,

    @inject("VariacoesRepository")
    private variacoesRepository: IVariacoesRepository,
  ) {}

  public async execute(data: IRequest): Promise<Skus> {
    const sku = await this.skusRepository.findSkuById(data.id);
    if (!sku) {
      throw new AppError("Sku não encontrado.");
    }
    const var1 = await this.variacoesRepository.findById(data.var1_id);
    if (!var1) {
      throw new AppError("Variação 1 não encontrado.");
    }

    const var2 = await this.variacoesRepository.findById(data.var2_id);
    if (!var2) {
      throw new AppError("Variação 2 não encontrado.");
    }

    sku.var1_id = data.var1_id;
    sku.var1fk = var1;
    sku.var2_id = data.var2_id;
    sku.var2fk = var2;
    sku.ativo = data.ativo;
    sku.referencia = data.referencia;
    sku.preco_custo = data.preco_custo;
    sku.preco_venda = data.preco_venda;
    sku.produto_id = data.produto_id;
    sku.peso = data.peso;
    sku.gtin = data.gtin;
    sku.mpn = data.mpn;

    await this.skusRepository.save(sku);

    return sku;
  }
}

export default UpdateSkuService;
