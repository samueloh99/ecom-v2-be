import { getRepository, Repository } from "typeorm";

import IRolesRepository from "@modules/usuarios/repositories/IRolesRepository";

import Role from "@modules/usuarios/infra/typeorm/models/Roles";

import ICreateRolesDTO from "@modules/usuarios/dtos/ICreateRolesDTO";

class RolesRepository implements IRolesRepository {
  private ormRepository: Repository<Role>;

  constructor() {
    this.ormRepository = getRepository(Role);
  }

  public async save(role: Role): Promise<Role> {
    return await this.ormRepository.save(role);
  }

  public async findRoleById(roleId: number): Promise<Role | undefined> {
    const role = await this.ormRepository.findOne({ where: { id: roleId } });

    return role;
  }

  public async findByIds(roles: Role[]): Promise<Role[]> {
    return await this.ormRepository.findByIds(roles);
  }

  public async create({ nome, descricao }: ICreateRolesDTO): Promise<Role> {
    const role = this.ormRepository.create({ nome, descricao });

    await this.ormRepository.save(role);

    return role;
  }

  public async findRoleByNome(nome: string): Promise<Role | undefined> {
    const findByName = await this.ormRepository.findOne({
      where: { nome },
    });

    return findByName;
  }
}

export default RolesRepository;
