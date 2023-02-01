import { Request, Response } from "express";

import { container } from "tsyringe";

import CreateUserCheckoutService from "@modules/checkout/services/db/CreateUserCheckoutService";
import UpdateUserCheckoutService from "@modules/checkout/services/db/UpdateUserCheckoutService";

export default class UsersCheckoutController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      ativo,
      tipo,
      nome_completo,
      email,
      celular,
      telefone,
      cpf,
      nascimento,
      genero,
      ie,
      im,
      cnpj,
      newsletter,
      estrangeiro,
    } = request.body;

    const createUserCheckoutService = container.resolve(
      CreateUserCheckoutService,
    );

    const createUserCheckout = await createUserCheckoutService.execute({
      ativo,
      tipo,
      nome_completo,
      email,
      senha: "mudar@321",
      celular,
      telefone,
      cpf,
      nascimento,
      genero,
      ie,
      im,
      cnpj,
      newsletter,
      estrangeiro,
    });

    const userWithoutPassword = {
      id: createUserCheckout.id,
      ativo: createUserCheckout.ativo,
      tipo: createUserCheckout.tipo,
      name: createUserCheckout.nome_completo,
      email: createUserCheckout.email,
      celular: createUserCheckout.celular,
      telefone: createUserCheckout.telefone,
      cpf: createUserCheckout.cpf,
      genero: createUserCheckout.genero,
      nascimento: createUserCheckout.nascimento,
      created_at: createUserCheckout.created_at,
      updated_at: createUserCheckout.updated_at,
      ie: createUserCheckout.ie,
      im: createUserCheckout.im,
      cnpj: createUserCheckout.cnpj,
      newsletter: createUserCheckout.newsletter,
      estrangeiro: createUserCheckout.estrangeiro,
    };

    return response.json(userWithoutPassword);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
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

    const updateUserCheckoutService = container.resolve(
      UpdateUserCheckoutService,
    );

    const updatedUser = await updateUserCheckoutService.execute({
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
      id: parseInt(id as string),
    });

    const userWithoutPassword = {
      id: updatedUser.id,
      admin: updatedUser.tipo,
      roles: updatedUser.roles.map(item => item.nome),
      permissoes: updatedUser.permissoes.map(item => item.nome),
      nome_completo: updatedUser.nome_completo,
      email: updatedUser.email,
      ativo: updatedUser.ativo,
      celular: updatedUser.celular,
      telefone: updatedUser.telefone,
      cpf: updatedUser.cpf,
      nascimento: updatedUser.nascimento,
      genero: updatedUser.genero,
      created_at: updatedUser.created_at,
      updated_at: updatedUser.updated_at,
      ie: updatedUser.ie,
      im: updatedUser.im,
      cnpj: updatedUser.cnpj,
      newsletter: updatedUser.newsletter,
      data_acesso: updatedUser.data_acesso,
      total_pedidos: updatedUser.total_pedidos,
      estrangeiro: updatedUser.estrangeiro,
    };

    return response.json(userWithoutPassword);
  }
}
