import { Request, Response } from "express";
import { container } from "tsyringe";

import CreatePagamentoService from "@modules/configuracoes/services/pagamentos/CreatePagamentoService";
import ListPagamentoService from "@modules/configuracoes/services/pagamentos/ListPagamentoService";
import UpdatePagamentoService from "@modules/configuracoes/services/pagamentos/UpdatePagamentoService";
import DeletePagamentoService from "@modules/configuracoes/services/pagamentos/DeletePagamentoService";

export default class PagamentosController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      ativo,
      public_key,
      secret_key,
      prazo_boleto,
      prazo_pix,
      boleto_ativo,
      pix_ativo,
      boleto_desconto,
      pix_desconto,
    } = request.body;

    const createPagamentoService = container.resolve(CreatePagamentoService);

    const newPagamento = await createPagamentoService.execute({
      ativo,
      public_key,
      secret_key,
      prazo_boleto,
      prazo_pix,
      boleto_ativo,
      pix_ativo,
      boleto_desconto,
      pix_desconto,
    });

    return response.json(newPagamento);
  }

  public async list(_: Request, response: Response): Promise<Response> {
    const listPagamentoService = container.resolve(ListPagamentoService);

    const all = await listPagamentoService.execute();

    return response.json(all);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletePagamentoService = container.resolve(DeletePagamentoService);

    const deletePagamento = await deletePagamentoService.execute({
      id: parseInt(id),
    });

    return response.json(deletePagamento);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const id = parseInt(request.params.id);
    const {
      ativo,
      public_key,
      secret_key,
      prazo_boleto,
      prazo_pix,
      boleto_ativo,
      pix_ativo,
      boleto_desconto,
      pix_desconto,
    } = request.body;

    const updatePagamentoService = container.resolve(UpdatePagamentoService);

    const updatedPagamento = await updatePagamentoService.execute({
      id,
      ativo,
      public_key,
      secret_key,
      prazo_boleto,
      prazo_pix,
      boleto_ativo,
      pix_ativo,
      boleto_desconto,
      pix_desconto,
    });

    return response.json(updatedPagamento);
  }
}
