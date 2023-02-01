import { Request, Response } from "express";
import { container } from "tsyringe";

import AuthenticateUserService from "@modules/usuarios/services/AuthenticateUsusarioService";

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, senha } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { usuario, token, refreshTokenId } = await authenticateUser.execute({
      email,
      senha,
    });

    const userWithoutPassword = {
      id: usuario.id,
      admin: usuario.tipo,
      roles: usuario.roles.map(item => item.nome),
      permissoes: usuario.permissoes.map(item => item.nome),
      nome_completo: usuario.nome_completo,
      email: usuario.email,
      ativo: usuario.ativo,
      celular: usuario.celular,
      telefone: usuario.telefone,
      cpf: usuario.cpf,
      nascimento: usuario.nascimento,
      genero: usuario.genero,
      created_at: usuario.created_at,
      updated_at: usuario.updated_at,
      ie: usuario.ie,
      im: usuario.im,
      cnpj: usuario.cnpj,
      newsletter: usuario.newsletter,
      data_acesso: usuario.data_acesso,
      total_pedidos: usuario.total_pedidos,
      estrangeiro: usuario.estrangeiro,
    };

    return response.json({ user: userWithoutPassword, token, refreshTokenId });
  }
}
