import { container } from "tsyringe";
import { Request, Response } from "express";

import CreateSkuService from "@modules/skus/services/CreateSkuService";
import ListSkuService from "@modules/skus/services/ListSkuService";
import UpdateSkuPhoto from "@modules/skus/services/UpdateSkuPhotoService";
import UpdateSkuService from "@modules/skus/services/UpdateSkuService";
import DeleteSkuService from "@modules/skus/services/DeleteSkuService";
import FilterSkuCategoryPageService from "@modules/skus/services/FilterSkuCategoryPageService";
import FilterSkuVariantsCategoryPageService from "@modules/skus/services/FilterSkuVariantsCategoryPageService";
import SearchAllService from "@modules/skus/services/SearchAllService";
import SearchSkuIdService from "@modules/skus/services/SearchSkuIdService";
import FilterSkuHomePageService from "@modules/skus/services/FilterSkuHomePageService";

export default class SkusController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      preco_custo,
      preco_venda,
      peso,
      var1_id,
      var2_id,
      produto_id,
      gtin,
      mpn,
      referencia,
      ativo,
      estoque,
      foto1,
      foto2,
      foto3,
      foto4,
      foto5,
      foto6,
    } = request.body;

    const createSkuService = container.resolve(CreateSkuService);

    const newSku = await createSkuService.execute({
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

    return response.json(newSku);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const {
      atual,
      mostrar,
      ativos,
      inativos,
      skuCodigo,
      skuReferencia,
      precoVendaOp,
      precoVenda,
      estoqueOp,
      estoque,
      produtoNome,
      produtoCodigo,
      produtoReferencia,
      produtoMarca,
      categoria,
    } = request.query;

    const listSkuService = container.resolve(ListSkuService);

    const allSkus = await listSkuService.execute({
      perPage: parseInt(mostrar as string),
      currentPage: parseInt(atual as string),
      ativos: ativos as string,
      inativos: inativos as string,
      skuCodigo: skuCodigo as string,
      skuReferencia: skuReferencia as string,
      precoVendaOp: precoVendaOp as string,
      precoVenda: precoVenda as string,
      estoqueOp: estoqueOp as string,
      estoque: estoque as string,
      produtoNome: produtoNome as string,
      produtoCodigo: produtoCodigo as string,
      produtoReferencia: produtoReferencia as string,
      produtoMarca: produtoMarca as string,
      categoria: categoria as string,
    });

    return response.json(allSkus);
  }

  public async updatePhoto(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updateSkuPhoto = container.resolve(UpdateSkuPhoto);

    const idN = parseInt(request.params.id);

    const sku = await updateSkuPhoto.execute({
      id: idN,
      fotos: request.files as { [fieldname: string]: Express.Multer.File[] },
    });

    return response.json(sku);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const {
      var1_id,
      var2_id,
      ativo,
      referencia,
      preco_custo,
      preco_venda,
      produto_id,
      peso,
      gtin,
      mpn,
    } = request.body;

    const updateSkuService = container.resolve(UpdateSkuService);

    const skuUpdate = await updateSkuService.execute({
      id: parseInt(id),
      var1_id,
      var2_id,
      ativo,
      referencia,
      preco_custo,
      preco_venda,
      produto_id,
      peso,
      gtin,
      mpn,
    });

    return response.json(skuUpdate);
  }

  public async deleteSku(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);
    const deleteSkuService = container.resolve(DeleteSkuService);

    const findSkuAndDelete = deleteSkuService.execute(parsedId);

    return response.json(findSkuAndDelete);
  }

  public async filter(request: Request, response: Response): Promise<Response> {
    const { v, o, atual, mostrar } = request.query;
    const { id } = request.params;
    const filterUsuario = container.resolve(FilterSkuCategoryPageService);

    const filtered = await filterUsuario.execute({
      variacao: v as string,
      titulo_filtro: o as string,
      atual: atual as string,
      mostrar: mostrar as string,
      id,
    });

    return response.json(filtered);
  }

  public async filter_variants(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const filterSkuVariantsCategoryPageService = container.resolve(
      FilterSkuVariantsCategoryPageService,
    );

    const filterSkuVariantsCategoryPage =
      await filterSkuVariantsCategoryPageService.execute({
        id,
      });

    return response.json(filterSkuVariantsCategoryPage);
  }

  public async buscar(request: Request, response: Response): Promise<Response> {
    const { b, v, o, m, c } = request.query;

    const searchAllService = container.resolve(SearchAllService);

    const searchAllServiceRes = await searchAllService.execute({
      nome: b as string,
      categoria: c as string,
      variacao: v as string,
      marca: m as string,
      titulo_filtro: o as string,
    });

    return response.json(searchAllServiceRes);
  }

  public async buscarSkuId(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const searchSkuIdService = container.resolve(SearchSkuIdService);

    const searchSkuId = await searchSkuIdService.execute({
      id: parseInt(id),
    });

    return response.json(searchSkuId);
  }

  public async buscarSkusHome(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { referencias } = request.body;

    const filterSkuHomePageService = container.resolve(
      FilterSkuHomePageService,
    );

    const filterSkuHomePage = await filterSkuHomePageService.execute({
      referencias,
    });

    return response.json(filterSkuHomePage);
  }
}
