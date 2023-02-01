import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateUsuarioControleDeAcessoService from "@modules/usuarios/services/acl/CreateUsuarioControleDeAcessoService";

export default class PermissoesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { permissoes, roles, usuario_id } = request.body;

    const createUsuarioControleDeAcessoService = container.resolve(
      CreateUsuarioControleDeAcessoService,
    );

    const usuario = await createUsuarioControleDeAcessoService.execute({
      permissoes,
      roles,
      usuario_id,
    });

    return response.json(usuario);
  }
}
