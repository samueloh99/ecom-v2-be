import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateRolePermissaoService from "@modules/usuarios/services/acl/CreateRolePermissaoService";

export default class RolePermissoesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { permissoes } = request.body;
    const { roleId } = request.params;

    const createRolePermissaoService = container.resolve(
      CreateRolePermissaoService,
    );

    const result = await createRolePermissaoService.execute({
      roleId: parseInt(roleId),
      permissoes,
    });

    return response.json(result);
  }
}
