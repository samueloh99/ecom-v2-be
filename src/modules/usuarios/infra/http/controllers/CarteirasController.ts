import { Request, Response } from "express";

import { container } from "tsyringe";

import CreateCarteiraService from "@modules/usuarios/services/CreateCarteiraService";
import ListCarteiraService from "@modules/usuarios/services/ListCarteiraService";
import UpdateCarteiraService from "@modules/usuarios/services/UpdateCarteiraService";
import ListTotalUsuarioService from "@modules/usuarios/services/ListTotalUsuarioService";

export default class CarteirasController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { usuario_id, pedido_id, movimentacao, valor_carteira } =
      request.body;

    const createCarteiraService = container.resolve(CreateCarteiraService);

    const newCarteira = await createCarteiraService.execute({
      usuario_id,
      pedido_id,
      movimentacao,
      valor_carteira,
    });

    return response.json(newCarteira);
  }

  public async list(_: Request, response: Response): Promise<Response> {
    const listCarteiraService = container.resolve(ListCarteiraService);

    const all = await listCarteiraService.execute();

    return response.json(all);
  }

  public async usuarioTotal(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const listTotalUsuarioService = container.resolve(ListTotalUsuarioService);

    const all = await listTotalUsuarioService.execute({ id: parseInt(id) });

    return response.json(all);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { movimentacao, valor_carteira } = request.body;
    const { id } = request.params;

    const updateCarteiraService = container.resolve(UpdateCarteiraService);

    const updateCarteira = await updateCarteiraService.execute({
      id: parseInt(id),
      movimentacao,
      valor_carteira,
    });

    return response.json(updateCarteira);
  }
}
