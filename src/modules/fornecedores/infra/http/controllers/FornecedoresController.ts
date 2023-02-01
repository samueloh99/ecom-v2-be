import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateFornecedorService from "@modules/fornecedores/services/CreateFornecedorService";
import ListFornecedorService from "@modules/fornecedores/services/ListFornecedorService";
import UpdateFornecedorService from "@modules/fornecedores/services/UpdateFornecedorService";
import DeleteFornecedorService from "@modules/fornecedores/services/DeleteFornecedorService";

export default class FornecedoresController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, site, email, telefone, observacoes, ativo } = request.body;

    const createFornecedor = container.resolve(CreateFornecedorService);

    const fornecedor = await createFornecedor.execute({
      nome,
      site,
      email,
      telefone,
      observacoes,
      ativo,
    });

    return response.json(fornecedor);
  }

  public async list(_: Request, response: Response): Promise<Response> {
    const createFornecedor = container.resolve(ListFornecedorService);

    const all = await createFornecedor.execute();

    return response.json(all);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteFornecedorContainer = container.resolve(
      DeleteFornecedorService
    );

    const deleteFornecedorRes = await deleteFornecedorContainer.execute({
      id: parseInt(id),
    });

    return response.json(deleteFornecedorRes);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const id = parseInt(request.params.id);
    const { nome, site, email, telefone, observacoes, ativo } = request.body;

    const updateFornecedor = container.resolve(UpdateFornecedorService);

    const categoria = await updateFornecedor.execute({
      id,
      nome,
      site,
      email,
      telefone,
      observacoes,
      ativo,
    });

    return response.json(categoria);
  }
}
