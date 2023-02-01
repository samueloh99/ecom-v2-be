import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import IRolesRepository from "@modules/usuarios/repositories/IRolesRepository";

import Role from "@modules/usuarios/infra/typeorm/models/Roles";

type IRequest = {
  nome: string;
  descricao: string;
};

@injectable()
class CreateRoleService {
  constructor(
    @inject("RolesRepository")
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute({ nome, descricao }: IRequest): Promise<Role> {
    const role = await this.rolesRepository.findRoleByNome(nome);

    if (role) {
      throw new AppError("Role já existe.");
    }

    const newRole = await this.rolesRepository.create({ nome, descricao });

    return newRole;
  }
}

export default CreateRoleService;
