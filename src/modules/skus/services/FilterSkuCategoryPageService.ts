import { injectable, inject } from "tsyringe";

import ISkusRepository from "@modules/skus/repositories/ISkusRepository";
import IPedidosProdutosRepository from "@modules/pedidosProdutos/repositories/IPedidosProdutosRepository";
import Sku from "@modules/skus/infra/typeorm/models/Skus";
import IDescontosRepository from "@modules/produtos/repositories/IDescontosRepository";
import IProdutosRepository from "@modules/produtos/repositories/IProdutosRepository";

interface IRequest {
  id: string;
  variacao: string;
  titulo_filtro: string;
  atual: string;
  mostrar: string;
}

interface IResponse {
  skus: {
    produto_id: number;
    sku_id: number;
    sku_referencia: string;
    produto_referencia: string;
    nome: string;
    cores: {
      nome: string;
      foto: string;
    }[];
    tamanhos: {
      nome: string;
      foto: string;
    }[];
    preco_original: number;
    preco_desconto: number;
    total_pedidos: number;
    foto1: string;
    foto2: string;
    created_at: Date;
    updated_at: Date;
  }[];
  pag: {
    paginas: number;
    atual: number;
    encontrados: number;
    exibindo: number;
  };
}

@injectable()
class FindSkuProdutoByCatIdService {
  constructor(
    @inject("SkusRepository")
    private skusRepository: ISkusRepository,

    @inject("PedidosProdutosRepository")
    private pedidosProdutosRepository: IPedidosProdutosRepository,

    @inject("DescontosRepository")
    private descontosRepository: IDescontosRepository,

    @inject("ProdutosRepository")
    private produtosRepository: IProdutosRepository,
  ) {}

  public async execute({
    id,
    variacao,
    titulo_filtro,
    atual,
    mostrar,
  }: IRequest): Promise<Sku[] | IResponse> {
    const priorityListByCategory = [
      {
        cat: 19,
        ref: [
          "CH-6842",
          "CH-6809",
          "CH-6823",
          "CH-6802",
          "CH-6719",
          "CH-6805",
          "CH-6506",
          "CH-6532",
        ],
      },
      {
        cat: 20,
        ref: ["CH-6854", "CH-6523", "CH-6844", "CH-6657"],
      },
      {
        cat: 25,
        ref: ["CH-6734", "CH-6513"],
      },
      {
        cat: 28,
        ref: [
          "CH-6826",
          "CH-6766",
          "CH-6688",
          "CH-6796",
          "CH-6765",
          "CH-6391",
          "CH-6575",
          "CH-6721",
          "CH-6726",
          "CH-6416",
        ],
      },
      {
        cat: 27,
        ref: ["CH-6732", "CH-6813", "CH-6840", "CH-6598"],
      },
      {
        cat: 26,
        ref: [
          "CH-6696",
          "CH-6745",
          "CH-6740",
          "CH-6751",
          "CH-6667",
          "CH-6551",
          "CH-6739",
          "CH-6500",
          "CH-6710",
        ],
      },
      {
        cat: 18,
        ref: [
          "CH-6829",
          "CH-6814",
          "CH-6748",
          "CH-6863",
          "CH-6803",
          "CH-6835",
          "CH-6830",
          "CH-6818",
          "CH-6810",
          "CH-6512",
          "CH-6780",
          "CH-6729",
          "CH-6864",
          "CH-6871",
          "CH-6756",
          "CH-6834",
          "CH-6817",
          "CH-6773",
          "CH-6821",
          "CH-6749",
          "CH-6757",
          "CH-6781",
          "CH-6789",
          "CH-6714",
          "CH-6761",
          "CH-6783",
          "CH-6776",
          "CH-6733",
          "CH-6717",
          "CH-6725",
          "CH-6786",
          "CH-6730",
          "CH-6763",
          "CH-6507",
          "CH-6486",
          "CH-6806",
          "CH-6755",
          "CH-6502",
          "CH-6497",
          "CH-6519",
          "CH-6306",
          "CH-6401",
          "CH-6439",
          "CH-6304",
          "CH-6370",
          "CH-6703",
          "CH-6511",
          "CH-6549",
          "CH-6659",
          "CH-6479",
          "CH-6463",
          "CH-6305",
          "CH-6641",
          "CH-6275",
        ],
      },
    ];

    const priorityFiltered = priorityListByCategory.find(
      item => item.cat === parseInt(id),
    );

    const descontos = await this.descontosRepository.list();

    const pedidosProdutos =
      await this.pedidosProdutosRepository.listWithoutPagination();

    const dateFormated = new Date(Date.now());

    // FORMATACAO DE VARIACOES DE FILTRO
    const variacoesFormatted =
      variacao === undefined || variacao.length === 0
        ? []
        : variacao.split(".").map(item => item);

    if (id === undefined) {
      return [];
    }

    // FILTRO DE SKU E PRODUTO POR CATEGORIA & SUBCATEGORIAS
    const skusFilterByCat = await this.skusRepository.findSkuProdutoByCatId(
      parseInt(id),
    );

    const produtcsFilterByCat =
      await this.produtosRepository.findProdutoByCatId(parseInt(id));

    if (skusFilterByCat === undefined || produtcsFilterByCat === undefined) {
      return [];
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

    let skuListFormated = skuToBeFilter
      .filter(item => item.ativo === 1)
      .map(item => {
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
          tags: item.produto.tags,
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

    let skuQty = skuListFormated.length;
    const perPage = mostrar ? parseInt(mostrar) : 12;
    const page = atual ? parseInt(atual) : 1;

    const pag = {
      paginas: skuQty / perPage < 1 ? 1 : Math.ceil(skuQty / perPage),
      atual: page,
      encontrados: skuQty,
      exibindo: perPage,
    };

    if (
      (titulo_filtro === undefined || titulo_filtro === "") &&
      variacoesFormatted.length === 0
    ) {
      skuListFormated = priorityFiltered
        ? skuListFormated.sort(
            (a, b) =>
              priorityFiltered.ref.indexOf(a.produto_referencia) -
              priorityFiltered.ref.indexOf(b.produto_referencia),
          )
        : skuListFormated;

      return {
        skus: skuListFormated.slice(perPage * (page - 1), perPage * page),
        pag: pag,
      };
    }

    if (variacoesFormatted.length > 0) {
      let skuToBeFilter: number[] = [];

      const firstFilter = skusFilterByCat
        .filter(item => variacoesFormatted.includes(item.var1fk.nome))
        .map(item => item.id);

      const secondFilter = skusFilterByCat
        .filter(item => variacoesFormatted.includes(item.var2fk.nome))
        .map(item => item.id);

      if (firstFilter.length === 0 || secondFilter.length === 0) {
        skuToBeFilter = firstFilter.concat(secondFilter);
      } else {
        skuToBeFilter = firstFilter.filter(
          item => secondFilter.indexOf(item) > -1,
        );
      }

      skuListFormated = skuListFormated.filter(item =>
        skuToBeFilter.includes(item.sku_id),
      );
    }

    if (titulo_filtro !== undefined && titulo_filtro === "best_seller") {
      skuListFormated = skuListFormated.sort(
        (a, b) => b.total_pedidos - a.total_pedidos,
      );

      skuQty = skuListFormated.length;
      const pag = {
        paginas: skuQty / perPage < 1 ? 1 : Math.ceil(skuQty / perPage),
        atual: page,
        encontrados: skuQty,
        exibindo: perPage,
      };

      return {
        skus: skuListFormated.slice(perPage * (page - 1), perPage * page),
        pag: pag,
      };
    }

    if (titulo_filtro !== undefined && titulo_filtro === "name") {
      skuListFormated = skuListFormated.sort((a, b) =>
        a.nome > b.nome ? 1 : -1,
      );

      skuQty = skuListFormated.length;
      const pag = {
        paginas: skuQty / perPage < 1 ? 1 : Math.ceil(skuQty / perPage),
        atual: page,
        encontrados: skuQty,
        exibindo: perPage,
      };

      return {
        skus: skuListFormated.slice(perPage * (page - 1), perPage * page),
        pag: pag,
      };
    }

    if (titulo_filtro !== undefined && titulo_filtro === "biggest_price") {
      skuListFormated = skuListFormated.sort(
        (a, b) => b.preco_original - a.preco_original,
      );
      skuQty = skuListFormated.length;
      const pag = {
        paginas: skuQty / perPage < 1 ? 1 : Math.ceil(skuQty / perPage),
        atual: page,
        encontrados: skuQty,
        exibindo: perPage,
      };

      return {
        skus: skuListFormated.slice(perPage * (page - 1), perPage * page),
        pag: pag,
      };
    }

    if (titulo_filtro !== undefined && titulo_filtro === "lowest_price") {
      skuListFormated = skuListFormated.sort(
        (a, b) => a.preco_original - b.preco_original,
      );
      skuQty = skuListFormated.length;
      const pag = {
        paginas: skuQty / perPage < 1 ? 1 : Math.ceil(skuQty / perPage),
        atual: page,
        encontrados: skuQty,
        exibindo: perPage,
      };

      return {
        skus: skuListFormated.slice(perPage * (page - 1), perPage * page),
        pag: pag,
      };
    }

    if (titulo_filtro !== undefined && titulo_filtro === "newin") {
      skuListFormated = skuListFormated.sort(
        (a, b) => b.created_at.getTime() - a.created_at.getTime(),
      );
      skuQty = skuListFormated.length;
      const pag = {
        paginas: skuQty / perPage < 1 ? 1 : Math.ceil(skuQty / perPage),
        atual: page,
        encontrados: skuQty,
        exibindo: perPage,
      };

      return {
        skus: skuListFormated.slice(perPage * (page - 1), perPage * page),
        pag: pag,
      };
    }

    skuQty = skuListFormated.length;
    const pagFormatted = {
      paginas: skuQty / perPage < 1 ? 1 : Math.ceil(skuQty / perPage),
      atual: page,
      encontrados: skuQty,
      exibindo: perPage,
    };

    return {
      skus: skuListFormated.slice(perPage * (page - 1), perPage * page),
      pag: pagFormatted,
    };
  }
}

export default FindSkuProdutoByCatIdService;
