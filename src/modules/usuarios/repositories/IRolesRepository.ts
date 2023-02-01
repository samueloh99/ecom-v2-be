import Role from "../infra/typeorm/models/Roles";
import ICreateRolesDTO from "../dtos/ICreateRolesDTO";

export default interface IRolesRepository {
  create({ nome, descricao }: ICreateRolesDTO): Promise<Role>;
  findRoleByNome(nome: string): Promise<Role | undefined>;
  findByIds(roles: Role[]): Promise<Role[]>;
  findRoleById(roleId: number): Promise<Role | undefined>;
  save(role: Role): Promise<Role>;
}
