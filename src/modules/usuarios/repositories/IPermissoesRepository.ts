import Permissoes from "../infra/typeorm/models/Permissoes";
import ICreateRolesDTO from "../dtos/ICreateRolesDTO";

export default interface IPermissoesRepository {
  create({ nome, descricao }: ICreateRolesDTO): Promise<Permissoes>;
  findPermissaoByNome(nome: string): Promise<Permissoes | undefined>;
  findByIds(permissoes: Permissoes[]): Promise<Permissoes[]>;
}
