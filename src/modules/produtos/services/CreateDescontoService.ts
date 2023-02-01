import { injectable, inject } from "tsyringe";

import Desconto from "@modules/produtos/infra/typeorm/models/Descontos";

import IDescontosRepository from "@modules/produtos/repositories/IDescontosRepository";
import AppError from "@shared/errors/AppError";
import IProdutosRepository from "@modules/produtos/repositories/IProdutosRepository";

interface IRequest {
  produto_id: number;
  desconto_tipo: number;
  desconto_valor: number;
  data_desconto_1: Date;
  data_desconto_2: Date;
}

@injectable()
class CreateDescontoService {
  constructor(
    @inject("DescontosRepository")
    private descontosRepository: IDescontosRepository,

    @inject("ProdutosRepository")
    private produtosRepository: IProdutosRepository,
  ) {}

  public async execute({
    produto_id,
    desconto_tipo,
    desconto_valor,
    data_desconto_1,
    data_desconto_2,
  }: IRequest): Promise<Desconto> {
    const findProdutoById = await this.produtosRepository.findProdutoById(
      produto_id,
    );

    if (!findProdutoById) {
      throw new AppError("Produto não existe");
    }

    const novoDesconto = await this.descontosRepository.create({
      produto_id,
      desconto_tipo,
      desconto_valor,
      data_desconto_1,
      data_desconto_2,
    });

    return novoDesconto;
  }
}

export default CreateDescontoService;
