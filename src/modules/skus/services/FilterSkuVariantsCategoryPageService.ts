import { injectable, inject } from "tsyringe";

import ISkusRepository from "@modules/skus/repositories/ISkusRepository";
import IPedidosProdutosRepository from "@modules/pedidosProdutos/repositories/IPedidosProdutosRepository";
import Sku from "@modules/skus/infra/typeorm/models/Skus";
import IDescontosRepository from "@modules/produtos/repositories/IDescontosRepository";
import IProdutosRepository from "@modules/produtos/repositories/IProdutosRepository";

interface IRequest {
  id: string;
}

interface IResponse {
  cores: string[];
  tamanhos: string[];
}

@injectable()
class FilterSkuVariantsCategoryPageService {
  constructor(
    @inject("SkusRepository")
    private skusRepository: ISkusRepository,

    @inject("ProdutosRepository")
    private produtosRepository: IProdutosRepository,

    @inject("PedidosProdutosRepository")
    private pedidosProdutosRepository: IPedidosProdutosRepository,

    @inject("DescontosRepository")
    private descontosRepository: IDescontosRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const descontos = await this.descontosRepository.list();

    const pedidosProdutos =
      await this.pedidosProdutosRepository.listWithoutPagination();

    const skusFilterByCat = await this.skusRepository.findSkuProdutoByCatId(
      parseInt(id),
    );
    const produtcsFilterByCat =
      await this.produtosRepository.findProdutoByCatId(parseInt(id));

    const dateFormated = new Date(Date.now());

    if (!id) {
      return {
        cores: [],
        tamanhos: [],
      };
    }

    if (skusFilterByCat === undefined || produtcsFilterByCat === undefined) {
      return {
        cores: [],
        tamanhos: [],
      };
    }

    let skuToBeFilter: Sku[] = [];

    const productWithDetails = produtcsFilterByCat.map(product => {
      const findSkuWithProductId = skusFilterByCat.filter(
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

    let skuListFormated = skuToBeFilter.map(item => {
      const countOrdersPerSku = pedidosProdutos.filter(
        ped => ped.sku_id === item.id,
      ).length;

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

      const filterProductWithDetails = productWithDetails.find(
        product => product.id === item.produto_id,
      );

      return {
        produto_id: item.produto_id,
        sku_id: item.id,
        sku_referencia: item.referencia,
        produto_referencia: item.produto.referencia,
        nome: item.produto.nome,
        cores:
          filterProductWithDetails !== undefined
            ? filterProductWithDetails.var1
            : [],
        tamanhos:
          filterProductWithDetails !== undefined
            ? filterProductWithDetails.var2
            : [],
        preco_original: item.preco_venda,
        preco_desconto: preco_desconto === false ? 0 : preco_desconto,
        total_pedidos: countOrdersPerSku,
        foto1: item.foto1,
        foto2: item.foto2,
        created_at: item.created_at,
        updated_at: item.updated_at,
      };
    });

    skuListFormated = skuListFormated.filter(
      item => item.foto1 && item.foto1.includes("http"),
    );

    const var1UniqueValues = Array.from(
      new Set(
        skuListFormated.map(item => item.cores.map(cor => cor.nome)).flat(),
      ),
    ).sort((a, b) => a.localeCompare(b));

    const var2UniqueValues = Array.from(
      new Set(
        skuListFormated.map(item => item.tamanhos.map(tam => tam.nome)).flat(),
      ),
    ).sort((a, b) => b.localeCompare(a));

    return {
      cores: var1UniqueValues,
      tamanhos: var2UniqueValues,
    };
  }
}

export default FilterSkuVariantsCategoryPageService;
