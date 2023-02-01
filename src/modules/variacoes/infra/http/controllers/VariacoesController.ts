import { Request, Response } from "express";

import { container } from "tsyringe";

import CreateVariacaoService from "@modules/variacoes/services/CreateVariacaoService";
import ListVariacaoService from "@modules/variacoes/services/ListVariacaoService";
import UpdateVariacaoService from "@modules/variacoes/services/UpdateVariacaoService";
import DeleteVariacaoService from "@modules/variacoes/services/DeleteVariacaoService";
import UploadVariacaoPhotoService from "@modules/variacoes/services/UploadVariacaoPhotoService";

export default class VariacoesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, ativo, pai_id, cor_fundo } = request.body;

    const createVariacao = container.resolve(CreateVariacaoService);

    const variacao = await createVariacao.execute({
      nome,
      ativo,
      pai_id,
      cor_fundo,
    });

    return response.json(variacao);
  }

  public async uploadFoto(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const idN = parseInt(request.params.id);

    const uploadVariacaoPhotoService = container.resolve(
      UploadVariacaoPhotoService,
    );

    const foto_variacao = await uploadVariacaoPhotoService.execute({
      id: idN,
      foto: request.file,
    });

    return response.json(foto_variacao);
  }

  public async list(_: Request, response: Response): Promise<Response> {
    const createVariacao = container.resolve(ListVariacaoService);

    const all = await createVariacao.execute();

    return response.json(all);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { nome, ativo, pai_id, foto, cor_fundo } = request.body;

    const variacaoContainer = container.resolve(UpdateVariacaoService);

    const updateVariacao = await variacaoContainer.execute({
      id: parseInt(id),
      nome,
      ativo,
      pai_id,
      foto,
      cor_fundo,
    });

    return response.json(updateVariacao);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const variacaoContainer = container.resolve(DeleteVariacaoService);

    const deleteVariacao = await variacaoContainer.execute({
      id: parseInt(id),
    });

    return response.json(deleteVariacao);
  }
}
