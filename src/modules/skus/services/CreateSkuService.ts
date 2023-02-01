import { injectable, inject } from "tsyringe";

import ISkusRepository from "@modules/skus/repositories/ISkusRepository";
import Skus from "@modules/skus/infra/typeorm/models/Skus";
import AppError from "@shared/errors/AppError";
import IVariacoesRepository from "@modules/variacoes/repositories/IVariacoesRepository";
import IProdutosRepository from "@modules/produtos/repositories/IProdutosRepository";

interface IRequest {
  var1_id: number;
  var2_id: number;
  referencia: string;
  preco_custo: number;
  preco_venda: number;
  produto_id: number;
  peso: number;
  gtin: string;
  mpn: string;
  ativo: number;
  estoque: number;
  foto1: string;
  foto2: string;
  foto3: string;
  foto4: string;
  foto5: string;
  foto6: string;
}

@injectable()
class CreateSkuService {
  constructor(
    @inject("SkusRepository")
    private skusRepository: ISkusRepository,

    @inject("VariacoesRepository")
    private variacoesRepository: IVariacoesRepository,

    @inject("ProdutosRepository")
    private produtosRepository: IProdutosRepository
  ) {}

  public async execute({
    var1_id,
    var2_id,
    referencia,
    preco_custo,
    preco_venda,
    produto_id,
    peso,
    gtin,
    mpn,
    ativo,
    estoque,
    foto1,
    foto2,
    foto3,
    foto4,
    foto5,
    foto6,
  }: IRequest): Promise<Skus> {
    const checkIfProdutoIdExists =
      await this.produtosRepository.findProdutoById(produto_id);

    if (!checkIfProdutoIdExists) {
      throw new AppError("Product ID não existe");
    }

    const checkIfVariacao1IdExists = await this.variacoesRepository.findById(
      var1_id
    );

    const checkIfVariacao2IdExists = await this.variacoesRepository.findById(
      var2_id
    );

    if (!checkIfVariacao1IdExists || !checkIfVariacao2IdExists) {
      throw new AppError("Variacao não existe.");
    }

    const checkIfSkuRefExists = await this.skusRepository.findSkuByRef(
      referencia
    );

    if (checkIfSkuRefExists) {
      throw new AppError("Referência já existe.");
    }

    const skuByProdutoId = await this.skusRepository.findByProdutoId(
      produto_id
    );

    if (!skuByProdutoId) {
      throw new AppError("Nenhum SKU com esse produto id encontrado.");
    }

    skuByProdutoId.map((item) => {
      if (item.var1_id === var1_id && item.var2_id === var2_id) {
        throw new AppError("Variação já existe");
      }
    });

    const sku = await this.skusRepository.create({
      var1_id,
      var2_id,
      referencia,
      preco_custo,
      preco_venda,
      produto_id,
      peso,
      gtin,
      mpn,
      ativo,
      estoque,
      foto1,
      foto2,
      foto3,
      foto4,
      foto5,
      foto6,
    });

    return sku;
  }
}

export default CreateSkuService;
