import { Request, Response } from "express";

import { container } from "tsyringe";

import CreateProdutoService from "@modules/produtos/services/CreateProdutoService";
import ListProdutoService from "@modules/produtos/services/ListProdutoService";
import FindProdutoByIdService from "@modules/produtos/services/FindProdutoByIdService";
import DeleteProdutoService from "@modules/produtos/services/DeleteProdutoService";
import UpdateProdutoService from "@modules/produtos/services/UpdateProdutoService";
import UpdateProdutoSubCategoryService from "@modules/produtos/services/UpdateProdutoSubCategoryService";
import UpdateProdutoSubCategoryBulkService from "@modules/produtos/services/UpdateProdutoSubCategoryBulkService";
import UpdateProdutoTagsService from "@modules/produtos/services/UpdateProdutoTagsService";
import ListWithoutPaginationService from "@modules/produtos/services/ListWithoutPaginationService";

export default class ProdutosController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      slug,
      referencia,
      ncm,
      marca_id,
      categoria_id,
      sub_categorias_ids,
      fornecedor_id,
      comprimento,
      largura,
      altura,
      descricao,
      ativo,
      tipo_produto_id,
      tags,
    } = request.body;

    const createProdutoService = container.resolve(CreateProdutoService);

    const novoProduto = await createProdutoService.execute({
      nome,
      referencia,
      slug,
      ncm,
      marca_id,
      categoria_id,
      fornecedor_id,
      comprimento,
      largura,
      altura,
      descricao,
      tipo_produto_id,
      ativo,
      sub_categorias_ids,
      tags,
    });

    return response.json(novoProduto);
  }

  public async listWithoutPagination(
    _: Request,
    response: Response,
  ): Promise<Response> {
    const listWithoutPaginationService = container.resolve(
      ListWithoutPaginationService,
    );

    const ListWithoutPagination = await listWithoutPaginationService.execute();

    return response.json(ListWithoutPagination);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const {
      atual,
      mostrar,
      ativos,
      inativos,
      codigo,
      nome,
      referencia,
      ncm,
      fornecedor,
      marca,
      cadastroInicio,
      cadastroFim,
      categorias,
    } = request.query;

    const listProdutoService = container.resolve(ListProdutoService);

    const allProdutos = await listProdutoService.execute({
      perPage: parseInt(mostrar as string),
      currentPage: parseInt(atual as string),
      ativos: ativos as string,
      inativos: inativos as string,
      codigo: codigo as string,
      nome: nome as string,
      referencia: referencia as string,
      ncm: ncm as string,
      marca: marca as string,
      fornecedor: fornecedor as string,
      cadastroInicio: cadastroInicio as string,
      cadastroFim: cadastroFim as string,
      categorias: categorias as string,
    });

    return response.json(allProdutos);
  }

  public async findByProdutoId(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const findProdutoByIdService = container.resolve(FindProdutoByIdService);

    const produtoById = await findProdutoByIdService.execute({
      id: parseInt(id),
    });

    return response.json(produtoById);
  }

  public async deleteProduto(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);

    const deleteProdutoService = container.resolve(DeleteProdutoService);

    const findProdutoAndDelete = await deleteProdutoService.execute(parsedId);

    return response.json(findProdutoAndDelete);
  }

  public async updateProduto(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const {
      nome,
      slug,
      referencia,
      ncm,
      marca_id,
      categoria_id,
      fornecedor_id,
      comprimento,
      largura,
      altura,
      descricao,
      ativo,
      tipo_produto_id,
    } = request.body;

    const updateProdutoService = container.resolve(UpdateProdutoService);

    const findProdutoAndEdit = await updateProdutoService.execute({
      id: parseInt(id),
      nome,
      slug,
      referencia,
      ncm,
      marca_id,
      categoria_id,
      fornecedor_id,
      comprimento,
      largura,
      altura,
      descricao,
      tipo_produto_id,
      ativo,
    });

    return response.json(findProdutoAndEdit);
  }

  public async updateSubCategory(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const { sub_categorias_ids } = request.body;

    const updateProdutoSubCategoryService = container.resolve(
      UpdateProdutoSubCategoryService,
    );

    const updateProdutoSubCategory =
      await updateProdutoSubCategoryService.execute({
        id: parseInt(id),
        sub_categorias_ids: sub_categorias_ids as number[],
      });

    return response.json(updateProdutoSubCategory);
  }

  public async addProductToCategory(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { product_ids, categoria_id } = request.body;

    const updateProdutoSubCategoryBulkService = container.resolve(
      UpdateProdutoSubCategoryBulkService,
    );

    const updateProdutoSubCategoryBulk =
      await updateProdutoSubCategoryBulkService.execute({
        categoria_id: parseInt(categoria_id),
        product_ids: product_ids as number[],
      });

    return response.json(updateProdutoSubCategoryBulk);
  }

  public async updateProdutoTags(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const { tags } = request.body;

    const updateProdutoTagsService = container.resolve(
      UpdateProdutoTagsService,
    );

    const updateProdutoTags = await updateProdutoTagsService.execute({
      id: parseInt(id),
      tags,
    });

    return response.json(updateProdutoTags);
  }
}
