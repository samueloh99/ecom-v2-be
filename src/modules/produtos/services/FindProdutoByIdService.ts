import { injectable, inject } from "tsyringe";

import IProdutosRepository from "@modules/produtos/repositories/IProdutosRepository";
import IDescontosRepository from "@modules/produtos/repositories/IDescontosRepository";
import ISkusRepository from "@modules/skus/repositories/ISkusRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: number;
}

interface IResponse {
  id: number;
  nome: string;
  slug: string;
  referencia: string;
  ncm: string;
  marca_id: number;
  fornecedor_id: number;
  categoria_id: number;
  comprimento: string;
  altura: string;
  largura: string;
  descricao: string;
  ativo: number;
  desconto: {
    tipo: number;
    valor: number;
  };
  variantes: {
    idSku: number;
    preco: number;
    preco_desconto: number;
    sku_referencia: string;
    var1: string;
    var2: string;
    estoque: number;
    fotos: string[];
  }[];
}

@injectable()
class FindProdutoByIdService {
  constructor(
    @inject("ProdutosRepository")
    private produtosRepository: IProdutosRepository,

    @inject("SkusRepository")
    private skusRepository: ISkusRepository,

    @inject("DescontosRepository")
    private descontosRepository: IDescontosRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse | undefined> {
    const produto = await this.produtosRepository.findProdutoById(id);

    const descontos = await this.descontosRepository.list();

    const dateFormated = new Date(Date.now());

    if (!produto) {
      throw new AppError("Produto ID Não encontrado");
    }

    const skuRelated = await this.skusRepository.findSkuRelatedByProdutoId(id);

    if (!skuRelated) {
      throw new AppError("Nenhum Sku Relacionado a esse ID");
    }

    const produtoDesconto = descontos.find(
      desconto => desconto.produto_id === id,
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

    const variantes = skuRelated.map(item => {
      const preco_desconto =
        validateDesconto !== false &&
        (validateDesconto.desconto_tipo === 1
          ? item.preco_venda - validateDesconto.desconto_valor
          : item.preco_venda -
            item.preco_venda * (validateDesconto.desconto_valor / 100));

      return {
        idSku: item.id,
        preco: item.preco_venda,
        preco_desconto: preco_desconto === false ? 0 : preco_desconto,

        var1: item.var1fk.nome,
        var1Foto: item.var1fk.foto,
        sku_referencia: item.referencia,
        var2: item.var2fk.nome,
        estoque: item.estoque,
        peso: item.peso,
        fotos: [
          item.foto1,
          item.foto2,
          item.foto3,
          item.foto4,
          item.foto5,
          item.foto6,
        ],
      };
    });

    const newObj = {
      ...produto,
      desconto,
      variantes,
    };

    return newObj;
  }
}

export default FindProdutoByIdService;
