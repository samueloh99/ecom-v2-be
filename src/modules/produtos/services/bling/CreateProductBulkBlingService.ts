import { injectable, inject } from "tsyringe";

import IBlingCategoriesProvider from "@shared/container/providers/BlingERP/models/IBlingCategoriesProvider";
import ISkusRepository from "@modules/skus/repositories/ISkusRepository";
import Skus from "@modules/skus/infra/typeorm/models/Skus";
import ISQSBlingProvider from "@shared/container/providers/SQS/models/ISQSBlingProvider";

interface IRequest {
  codigo: string;
  descricao: string;
  descricaoCurta: string;
  descricaoComplementar: string;
  un: string;
  vlr_unit: number;
  preco_custo: number;
  peso_bruto: number;
  peso_liq: number;
  origem: string;
  marca: string;
  largura: string;
  altura: string;
  profundidade: string;
  unidadeMedida: string;
  idCategoria: number;
  variacoes: {
    variacao: {
      nome: string;
      codigo: string;
      vlr_unit: number;
      clonarDadosPai: string;
      deposito: {
        id: number;
        estoque: number;
      };
    };
  };
  urlVideo: string;
}

@injectable()
class CreateProductBulkBlingService {
  constructor(
    @inject("BlingCategoriesProvider")
    private blingCategoriesProvider: IBlingCategoriesProvider,

    @inject("SkusRepository")
    private skusRepository: ISkusRepository,

    @inject("SQSBlingProvider")
    private sqsBlingProvider: ISQSBlingProvider,
  ) {}

  public async execute(): Promise<{
    failed: number;
    sended: number;
    sended_queues: IRequest[];
    failed_queues: Skus[];
  }> {
    const skus = await this.skusRepository.listWithoutPagination();

    const blingCategorias = await this.blingCategoriesProvider.get();

    let skuToAdd: IRequest[] = [];

    let skuMissing: Skus[] = [];

    if (blingCategorias) {
      skus.map(item => {
        const findCategoryIdBling = blingCategorias.retorno.categorias.find(
          cat => cat.categoria.descricao === item.produto.categoria.nome,
        );

        if (findCategoryIdBling) {
          const skuToSend = {
            codigo: item.produto.referencia,
            descricao: item.produto.nome,
            descricaoCurta: item.produto.descricao,
            descricaoComplementar: "",
            un: "un",
            vlr_unit: item.preco_venda,
            preco_custo: item.preco_custo,
            peso_bruto: item.peso,
            peso_liq: item.peso,
            origem: "0",
            marca: "Chaes",
            largura: "",
            altura: "",
            profundidade: "",
            unidadeMedida: "Centímetros",
            idCategoria: findCategoryIdBling.categoria.id,
            variacoes: {
              variacao: {
                nome: item.produto.nome,
                codigo: item.referencia,
                vlr_unit: item.preco_venda,
                clonarDadosPai: "Sim",
                deposito: {
                  id: 14886818608,
                  estoque: item.estoque,
                },
              },
            },
            urlVideo: "",
          };

          return skuToAdd.push(skuToSend);
        }

        skuMissing.push(item);
      });
    }

    if (skuToAdd.length > 0) {
      skuToAdd.map(async item => {
        const stringfyCharge = JSON.stringify(item);
        await this.sqsBlingProvider.post({
          mensagem: stringfyCharge,
        });
      });
    }

    const response = {
      failed: skuMissing.length,
      sended: skuToAdd.length,
      sended_queues: skuToAdd,
      failed_queues: skuMissing,
    };

    return response;
  }
}

export default CreateProductBulkBlingService;
