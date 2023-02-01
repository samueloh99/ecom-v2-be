import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import IRolesRepository from "@modules/usuarios/repositories/IRolesRepository";
import IUsuariosRepository from "@modules/usuarios/repositories/IUsuariosRepository";

import Usuario from "@modules/usuarios/infra/typeorm/models/Usuarios";
import Permissoes from "@modules/usuarios/infra/typeorm/models/Permissoes";
import Role from "@modules/usuarios/infra/typeorm/models/Roles";
import IPermissoesRepository from "@modules/usuarios/repositories/IPermissoesRepository";

type IRequest = {
  usuario_id: number;
  roles: Role[];
  permissoes: Permissoes[];
};

@injectable()
class CreateUsuarioControleDeAcessoService {
  constructor(
    @inject("RolesRepository")
    private rolesRepository: IRolesRepository,

    @inject("PermissoesRepository")
    private permissoesRepository: IPermissoesRepository,

    @inject("UsuariosRepository")
    private usuariosRepository: IUsuariosRepository,
  ) {}

  public async execute({
    usuario_id,
    roles,
    permissoes,
  }: IRequest): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findById(usuario_id);

    if (!usuario) {
      throw new AppError("Usuario não encontrado.");
    }

    if (permissoes) {
      const permissoesExists = await this.permissoesRepository.findByIds(
        permissoes,
      );
      usuario.permissoes = permissoesExists;

      await this.usuariosRepository.save(usuario);
    }

    if (roles) {
      const rolesExists = await this.rolesRepository.findByIds(roles);
      usuario.roles = rolesExists;
      await this.usuariosRepository.save(usuario);
    }

    return usuario;
  }
}

export default CreateUsuarioControleDeAcessoService;
