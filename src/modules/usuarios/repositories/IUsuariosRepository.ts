import Usuarios from "@modules/usuarios/infra/typeorm/models/Usuarios";
import ICreateUsuarioDTO from "@modules/usuarios/dtos/ICreateUsuarioDTO";
import { IRequest, IResponse } from "@modules/usuarios/dtos/IListUsersDTO";

export default interface IUsuariosRepository {
  create(data: ICreateUsuarioDTO): Promise<Usuarios>;
  listWithoutPagination(): Promise<Usuarios[]>;
  list(props: IRequest): Promise<IResponse>;
  findByCpf(cpf: number): Promise<Usuarios | undefined>;
  findByEmail(email: string): Promise<Usuarios | undefined>;
  findById(id: number): Promise<Usuarios | undefined>;
  save(usuario: Usuarios): Promise<Usuarios>;
  delete(usuario: Usuarios): Promise<Usuarios>;
}
