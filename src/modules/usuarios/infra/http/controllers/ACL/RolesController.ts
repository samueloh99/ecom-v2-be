import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateRoleService from "@modules/usuarios/services/acl/CreateRoleService";

export default class RolesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, descricao } = request.body;

    const createRoleService = container.resolve(CreateRoleService);

    const role = await createRoleService.execute({
      nome,
      descricao,
    });

    return response.json(role);
  }
}
