import { injectable, inject } from "tsyringe";

import IProdutosRepository from "@modules/produtos/repositories/IProdutosRepository";
import ISkusRepository from "@modules/skus/repositories/ISkusRepository";

import { IResponse, IRequest } from "@modules/produtos/dtos/IListProductsDTO";

@injectable()
class ListProdutoService {
  constructor(
    @inject("ProdutosRepository")
    private produtosRepository: IProdutosRepository,

    @inject("SkusRepository")
    private skusRepository: ISkusRepository,
  ) {}

  public async execute({
    ativos,
    cadastroFim,
    cadastroInicio,
    categorias,
    codigo,
    currentPage,
    fornecedor,
    inativos,
    marca,
    ncm,
    nome,
    perPage,
    referencia,
  }: IRequest): Promise<IResponse> {
    const all = await this.produtosRepository.list({
      ativos,
      cadastroFim,
      cadastroInicio,
      categorias,
      codigo,
      fornecedor,
      inativos,
      marca,
      ncm,
      nome,
      referencia,
      currentPage,
      perPage,
    });

    const listSkus = await this.skusRepository.listWithoutPagination();

    const formattedProducts = all.produtos
      .map(product => {
        return {
          ...product,
          estoque: listSkus
            .filter(item => item.produto_id === product.id)
            .reduce((a, c) => a + c.estoque, 0),
          preco: listSkus
            .filter(item => item.produto_id === product.id)
            .map(item => item.preco_venda),
        };
      })
      .sort((a, b) => a.id - b.id);

    const res = {
      produtos: formattedProducts,
      pag: all.pag,
    };

    return res;
  }
}

export default ListProdutoService;
