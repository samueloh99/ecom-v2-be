import Endereco from "@modules/usuarios/infra/typeorm/models/Enderecos";
import ICreateEnderecosDTO from "@modules/usuarios/dtos/ICreateEnderecosDTO";
import { IRequest, IResponse } from "@modules/usuarios/dtos/IListEnderecosDTO";

export default interface IEnderecosRepository {
  create(data: ICreateEnderecosDTO): Promise<Endereco>;
  listWithoutPagination(): Promise<Endereco[]>;
  list(props: IRequest): Promise<IResponse>;
  save(endereco: Endereco): Promise<Endereco>;
  delete(endereco: Endereco): Promise<Endereco>;
  findById(id: number): Promise<Endereco | undefined>;
}
