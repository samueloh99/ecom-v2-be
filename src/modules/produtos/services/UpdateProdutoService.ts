import { injectable, inject } from "tsyringe";

import Produto from "@modules/produtos/infra/typeorm/models/Produtos";

import IProdutosRepository from "@modules/produtos/repositories/IProdutosRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: number;
  nome: string;
  slug: string;
  referencia: string;
  ncm: string;
  marca_id: number;
  categoria_id: number;
  fornecedor_id: number;
  comprimento: string;
  largura: string;
  altura: string;
  descricao: string;
  ativo: number;
  tipo_produto_id: number;
}

@injectable()
class UpdateProdutoService {
  constructor(
    @inject("ProdutosRepository")
    private produtosRepository: IProdutosRepository,
  ) {}

  public async execute(data: IRequest): Promise<Produto> {
    const findProdutoById = await this.produtosRepository.findProdutoById(
      data.id,
    );

    if (!findProdutoById) {
      throw new AppError("Esse produto não existe");
    }

    if (data) {
      Object.assign(findProdutoById, data);
    }

    await this.produtosRepository.save(findProdutoById);

    return findProdutoById;
  }
}

export default UpdateProdutoService;
