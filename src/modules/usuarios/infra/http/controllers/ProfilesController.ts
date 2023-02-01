import { Request, Response } from "express";
import { container } from "tsyringe";

import UpdateProfileService from "@modules/usuarios/services/UpdateProfileService";
import ShowProfileService from "@modules/usuarios/services/ShowProfileService";

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const id = parseInt(request.usuario.id);

    const showProfile = container.resolve(ShowProfileService);

    const usuario = await showProfile.execute({
      id,
    });

    const usuarioWithoutPassword = {
      id: usuario.id,
      tipo: usuario.tipo,
      ativo: usuario.ativo,
      nome_completo: usuario.nome_completo,
      estrangeiro: usuario.estrangeiro,
      email: usuario.email,
      celular: usuario.celular,
      newsletter: usuario.newsletter,
      telefone: usuario.telefone,
      cpf: usuario.cpf,
      nascimento: usuario.nascimento,
      genero: usuario.genero,
      created_at: usuario.created_at,
      updated_at: usuario.updated_at,
      roles: usuario.roles.map(item => item.nome),
      permissoes: usuario.permissoes.map(item => item.nome),
    };

    return response.json(usuarioWithoutPassword);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const id = parseInt(request.usuario.id);
    const {
      nome_completo,
      email,
      senha_antiga,
      senha,
      telefone,
      celular,
      cpf,
      nascimento,
      cnpj,
      estrangeiro,
      ie,
      im,
      newsletter,
      genero,
      tipo,
      ativo,
    } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const usuario = await updateProfile.execute({
      id,
      telefone,
      celular,
      cpf,
      genero,
      tipo,
      ativo,
      nascimento,
      cnpj,
      estrangeiro,
      ie,
      im,
      newsletter,
      nome_completo,
      email,
      senha_antiga,
      senha,
    });

    const usuarioWithoutPassword = {
      id: usuario.id,
      tipo: usuario.tipo,
      ativo: usuario.ativo,
      nome_completo: usuario.nome_completo,
      email: usuario.email,
      celular: usuario.celular,
      telefone: usuario.telefone,
      cpf: usuario.cpf,
      nascimento: usuario.nascimento,
      genero: usuario.genero,
      created_at: usuario.created_at,
      updated_at: usuario.updated_at,
    };

    return response.json(usuarioWithoutPassword);
  }
}
