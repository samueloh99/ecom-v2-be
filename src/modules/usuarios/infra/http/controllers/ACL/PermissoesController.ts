import { Request, Response } from "express";
import { container } from "tsyringe";

import CreatePermissaoService from "@modules/usuarios/services/acl/CreatePermissaoService";

export default class PermissoesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, descricao } = request.body;

    const createPermissaoService = container.resolve(CreatePermissaoService);

    const permissao = await createPermissaoService.execute({
      nome,
      descricao,
    });

    return response.json(permissao);
  }
}
