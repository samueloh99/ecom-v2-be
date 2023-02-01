import { injectable, inject } from "tsyringe";

import ISkusRepository from "@modules/skus/repositories/ISkusRepository";
import IDescontosRepository from "@modules/produtos/repositories/IDescontosRepository";
import IPedidosProdutosRepository from "@modules/pedidosProdutos/repositories/IPedidosProdutosRepository";
import Skus from "@modules/skus/infra/typeorm/models/Skus";
import IProdutosRepository from "@modules/produtos/repositories/IProdutosRepository";

interface IRequest {
  variacao: string;
  marca: string;
  categoria: string;
  nome: string;
  titulo_filtro: string;
}

interface SkuListFormated {
  produto_id: number;
  sku_id: number;
  nome: string;
  var1: {
    nome: string;
    foto: string;
  }[];
  var2: {
    nome: string;
    foto: string;
  }[];
  preco_original: number;
  preco_desconto: number;
  total_pedidos: number;
  created_at: Date;
  updated_at: Date;
  foto1: string;
  foto2: string;
  categoria: string;
}

interface IResponse {
  produtos: SkuListFormated[] | Skus[];
  categorias: string[];
  variacoes1: string[];
  variacoes2: string[];
}

@injectable()
class SearchAllService {
  constructor(
    @inject("ProdutosRepository")
    private produtosRepository: IProdutosRepository,

    @inject("SkusRepository")
    private skusRepository: ISkusRepository,

    @inject("DescontosRepository")
    private descontosRepository: IDescontosRepository,

    @inject("PedidosProdutosRepository")
    private pedidosProdutosRepository: IPedidosProdutosRepository,
  ) {}

  public async execute({
    nome,
    categoria,
    marca,
    titulo_filtro,
    variacao,
  }: IRequest): Promise<IResponse> {
    const skus = await this.skusRepository.listWithoutPagination();

    const products = await this.produtosRepository.listWithoutPagination();

    const descontos = await this.descontosRepository.list();

    const pedidosProdutos =
      await this.pedidosProdutosRepository.listWithoutPagination();

    const dateFormated = new Date(Date.now());

    const variacoesFormatted =
      variacao === undefined || variacao.length === 0
        ? []
        : variacao.split(".").map(item => item);

    const categoriaFormatted =
      categoria === undefined || categoria.length === 0
        ? []
        : categoria.split(".").map(item => item);

    const filteredSkus = skus
      .filter(item => item.ativo === 1)
      .filter(sku =>
        sku.produto.nome.toLowerCase().includes(nome.toLowerCase()),
      )
      .filter(item => item.foto1 && item.foto2);

    const filteredProducts = products
      .filter(item => item.ativo === 1)
      .filter(products =>
        products.nome.toLowerCase().includes(nome.toLowerCase()),
      );

    if (nome.length === 0) {
      return {
        produtos: [],
        categorias: [],
        variacoes1: [],
        variacoes2: [],
      };
    }

    let skuToBeFilter: Skus[] = [];

    const productWithDetails = filteredProducts.map(product => {
      const findSkuWithProductId = filteredSkus.filter(
        skus => skus.produto_id === product.id,
      );

      const uniqueVar1Name = Array.from(
        new Set(findSkuWithProductId.map(item => item.var1fk.nome)),
      ).map(item => {
        const findPhotoName = findSkuWithProductId.find(
          sku => sku.var1fk.nome === item,
        );

        if (findPhotoName) {
          skuToBeFilter.push(findPhotoName);
        }
        return {
          nome: item,
          foto: findPhotoName ? findPhotoName.var1fk.foto : "",
        };
      });

      const uniqueVar2Name = Array.from(
        new Set(findSkuWithProductId.map(item => item.var2fk.nome)),
      ).map(item => {
        const findPhotoName = findSkuWithProductId.find(
          sku => sku.var2fk.nome === item,
        );
        return {
          nome: item,
          foto: findPhotoName ? findPhotoName.var2fk.foto : "",
        };
      });

      return {
        id: product.id,
        nome: product.nome,
        ref: product.referencia,
        var1: uniqueVar1Name,
        var2: uniqueVar2Name,
      };
    });

    const formattedCategory = Array.from(
      new Set(filteredSkus.map(cat => cat.produto.categoria.nome)),
    );

    const formattedVariacao1 = Array.from(
      new Set(filteredSkus.map(var1 => var1.var1fk.nome)),
    );

    const formattedVariacao2 = Array.from(
      new Set(filteredSkus.map(var2 => var2.var2fk.nome)),
    );

    let skuFormatted = skuToBeFilter.map(item => {
      const produtoDesconto = descontos.find(
        desconto => desconto.produto_id === item.produto_id,
      );

      const validateDesconto =
        produtoDesconto !== undefined &&
        dateFormated > produtoDesconto.data_desconto_1 &&
        dateFormated < produtoDesconto.data_desconto_2 &&
        produtoDesconto;

      const preco_desconto =
        validateDesconto !== false &&
        (validateDesconto.desconto_tipo === 1
          ? item.preco_venda - validateDesconto.desconto_valor
          : item.preco_venda -
            item.preco_venda * (validateDesconto.desconto_valor / 100));

      const countPedidosProduto = pedidosProdutos.filter(
        ped => ped.produto_id === item.produto_id,
      ).length;

      const findByProductId = productWithDetails.find(
        product => product.id === item.produto_id,
      );

      return {
        produto_id: item.produto_id,
        categoria: item.produto.categoria.nome,
        sku_id: item.id,
        nome: item.produto.nome,
        var1: findByProductId !== undefined ? findByProductId.var1 : [],
        var2: findByProductId !== undefined ? findByProductId.var2 : [],
        preco_original: item.preco_venda,
        preco_desconto: preco_desconto === false ? 0 : preco_desconto,
        total_pedidos: countPedidosProduto,
        foto1: item.foto1,
        foto2: item.foto2,
        created_at: item.created_at,
        updated_at: item.updated_at,
      };
    });

    if (
      categoria === undefined &&
      marca === undefined &&
      titulo_filtro === undefined &&
      variacao === undefined
    ) {
      return {
        produtos: skuFormatted,
        categorias: formattedCategory,
        variacoes1: formattedVariacao1,
        variacoes2: formattedVariacao2,
      };
    }

    if (variacoesFormatted.length > 0) {
      let skuToBeFilter: number[] = [];

      const firstFilter = filteredSkus
        .filter(item => variacoesFormatted.includes(item.var1fk.nome))
        .map(item => item.id);

      const secondFilter = filteredSkus
        .filter(item => variacoesFormatted.includes(item.var2fk.nome))
        .map(item => item.id);

      if (firstFilter.length === 0 || secondFilter.length === 0) {
        skuToBeFilter = firstFilter.concat(secondFilter);
      } else {
        skuToBeFilter = firstFilter.filter(
          item => secondFilter.indexOf(item) > -1,
        );
      }

      skuFormatted = skuFormatted.filter(item =>
        skuToBeFilter.includes(item.sku_id),
      );
    }

    if (categoriaFormatted.length > 0) {
      skuFormatted = skuFormatted.filter(sku =>
        categoriaFormatted.includes(sku.categoria),
      );
    }

    if (titulo_filtro !== undefined && titulo_filtro === "best_seller") {
      skuFormatted = skuFormatted.sort(
        (a, b) => b.total_pedidos - a.total_pedidos,
      );

      return {
        produtos: skuFormatted,
        categorias: formattedCategory,
        variacoes1: formattedVariacao1,
        variacoes2: formattedVariacao2,
      };
    }

    if (titulo_filtro !== undefined && titulo_filtro === "name") {
      skuFormatted = skuFormatted.sort((a, b) => (a.nome > b.nome ? 1 : -1));

      return {
        produtos: skuFormatted,
        categorias: formattedCategory,
        variacoes1: formattedVariacao1,
        variacoes2: formattedVariacao2,
      };
    }

    if (titulo_filtro !== undefined && titulo_filtro === "biggest_price") {
      skuFormatted = skuFormatted.sort(
        (a, b) => a.preco_original - b.preco_original,
      );

      return {
        produtos: skuFormatted,
        categorias: formattedCategory,
        variacoes1: formattedVariacao1,
        variacoes2: formattedVariacao2,
      };
    }

    if (titulo_filtro !== undefined && titulo_filtro === "lowest_price") {
      skuFormatted = skuFormatted.sort(
        (a, b) => b.preco_original - a.preco_original,
      );

      return {
        produtos: skuFormatted,
        categorias: formattedCategory,
        variacoes1: formattedVariacao1,
        variacoes2: formattedVariacao2,
      };
    }

    if (titulo_filtro !== undefined && titulo_filtro === "newin") {
      skuFormatted = skuFormatted.sort(
        (a, b) => b.created_at.getTime() - a.created_at.getTime(),
      );

      return {
        produtos: skuFormatted,
        categorias: formattedCategory,
        variacoes1: formattedVariacao1,
        variacoes2: formattedVariacao2,
      };
    }

    return {
      produtos: skuFormatted,
      categorias: formattedCategory,
      variacoes1: formattedVariacao1,
      variacoes2: formattedVariacao2,
    };
  }
}

export default SearchAllService;
