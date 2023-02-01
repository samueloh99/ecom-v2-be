import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateDepositoService from "@modules/configuracoes/services/depositos/CreateDepositoService";
import ListDepositoService from "@modules/configuracoes/services/depositos/ListDepositoService";
import UpdateDepositoService from "@modules/configuracoes/services/depositos/UpdateDepositoService";
import DeleteDepositoService from "@modules/configuracoes/services/depositos/DeleteDepositoService";

export default class DepositosController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { ativo, cep_deposito, cep_maximo, cep_minimo, lembrete } =
      request.body;

    const createDepositoService = container.resolve(CreateDepositoService);

    const deposito = await createDepositoService.execute({
      ativo,
      cep_deposito,
      cep_maximo,
      cep_minimo,
      lembrete,
    });

    return response.json(deposito);
  }

  public async list(_: Request, response: Response): Promise<Response> {
    const listDepositoService = container.resolve(ListDepositoService);

    const all = await listDepositoService.execute();

    return response.json(all);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteDepositoService = container.resolve(DeleteDepositoService);

    const deleteDeposito = await deleteDepositoService.execute({
      id: parseInt(id),
    });

    return response.json(deleteDeposito);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const id = parseInt(request.params.id);
    const { ativo, cep_deposito, cep_maximo, cep_minimo, lembrete } =
      request.body;

    const updateDepositoService = container.resolve(UpdateDepositoService);

    const updateDeposito = await updateDepositoService.execute({
      id,
      ativo,
      cep_deposito,
      cep_maximo,
      cep_minimo,
      lembrete,
    });

    return response.json(updateDeposito);
  }
}
