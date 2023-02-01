import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import IRolesRepository from "@modules/usuarios/repositories/IRolesRepository";
import IPermissoesRepository from "@modules/usuarios/repositories/IPermissoesRepository";

import Role from "@modules/usuarios/infra/typeorm/models/Roles";
import Permissoes from "@modules/usuarios/infra/typeorm/models/Permissoes";

type IRequest = {
  roleId: number;
  permissoes: Permissoes[];
};

@injectable()
class CreateRolePermissaoService {
  constructor(
    @inject("RolesRepository")
    private rolesRepository: IRolesRepository,

    @inject("PermissoesRepository")
    private permissoesRepository: IPermissoesRepository,
  ) {}

  public async execute({ roleId, permissoes }: IRequest): Promise<Role> {
    const role = await this.rolesRepository.findRoleById(roleId);

    if (!role) {
      throw new AppError("Role não encontrado.");
    }

    const permissoesExists = await this.permissoesRepository.findByIds(
      permissoes,
    );

    role.permissoes = permissoesExists;

    await this.rolesRepository.save(role);

    return role;
  }
}

export default CreateRolePermissaoService;
