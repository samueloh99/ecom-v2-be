import Fornecedores from "@modules/fornecedores/infra/typeorm/models/Fornecedores";
import ICreateFornecedorDTO from "@modules/fornecedores/dtos/ICreateFornecedorDTO";

export default interface IFornecedoresRepository {
  create(data: ICreateFornecedorDTO): Promise<Fornecedores>;
  findByName(name: string): Promise<Fornecedores | undefined>;
  list(): Promise<Fornecedores[]>;
  findById(id: number): Promise<Fornecedores | undefined>;
  delete(categoria: Fornecedores): Promise<Fornecedores>;
  save(data: ICreateFornecedorDTO): Promise<Fornecedores>;
}
