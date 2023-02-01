import { Request, Response } from "express";

import { container } from "tsyringe";

import CreateUsuarioService from "@modules/usuarios/services/CreateUsuarioService";
import ListUsuarioService from "@modules/usuarios/services/ListUsuarioService";
import DeleteUsuarioService from "@modules/usuarios/services/DeleteUsuarioService";
import SendForgotPasswordEmailService from "@modules/usuarios/services/SendForgotPasswordEmailService";
import ResetPasswordService from "@modules/usuarios/services/ResetPasswordService";
import UpdateUserService from "@modules/usuarios/services/UpdateUserService";

export default class UsuariosController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      ativo,
      tipo,
      nome_completo,
      email,
      senha,
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

    const createUsuario = container.resolve(CreateUsuarioService);

    const usuario = await createUsuario.execute({
      ativo,
      tipo,
      nome_completo,
      email,
      senha,
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
      id: usuario.id,
      ativo: usuario.ativo,
      tipo: usuario.tipo,
      name: usuario.nome_completo,
      email: usuario.email,
      celular: usuario.celular,
      telefone: usuario.telefone,
      cpf: usuario.cpf,
      genero: usuario.genero,
      nascimento: usuario.nascimento,
      created_at: usuario.created_at,
      updated_at: usuario.updated_at,
      ie: usuario.ie,
      im: usuario.im,
      cnpj: usuario.cnpj,
      newsletter: usuario.newsletter,
      estrangeiro: usuario.estrangeiro,
    };

    return response.json(userWithoutPassword);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const {
      atual,
      mostrar,
      codigo,
      nome,
      email,
      cpf,
      genero,
      telefone,
      celular,
      recebeNewsletter,
      cadastroInicio,
      cadastroFim,
    } = request.query;

    const createUsuario = container.resolve(ListUsuarioService);

    const all = await createUsuario.execute({
      perPage: parseInt(mostrar as string),
      currentPage: parseInt(atual as string),
      codigo: codigo as string,
      nome: nome as string,
      email: email as string,
      cpf: cpf as string,
      genero: genero as string,
      telefone: telefone as string,
      celular: celular as string,
      recebeNewsletter: recebeNewsletter as string,
      cadastroInicio: cadastroInicio as string,
      cadastroFim: cadastroFim as string,
    });

    return response.json(all);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUsuarioContainer = container.resolve(DeleteUsuarioService);

    const deleteUsuarioRes = await deleteUsuarioContainer.execute({
      id: parseInt(id),
    });

    return response.json(deleteUsuarioRes);
  }

  public async forgotPassword(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService,
    );

    await sendForgotPasswordEmail.execute({
      email,
    });

    return response.status(204).json();
  }

  public async resetPassword(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { senha, token } = request.body;

    const resetPasswordEmail = container.resolve(ResetPasswordService);

    await resetPasswordEmail.execute({
      token,
      senha,
    });

    return response.status(204).json();
  }

  public async updateUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
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

    const updateUserService = container.resolve(UpdateUserService);

    const updatedUser = await updateUserService.execute({
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
