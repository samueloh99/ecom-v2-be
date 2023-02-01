import Categorias from "@modules/categorias/infra/typeorm/models/Categorias";
import ICreateCategoriaDTO from "@modules/categorias/dtos/ICreateCategoriaDTO";

export default interface ICategoriasRepository {
  create(data: ICreateCategoriaDTO): Promise<Categorias>;
  findByName(name: string): Promise<Categorias | undefined>;
  list(): Promise<Categorias[]>;
  findById(id: number): Promise<Categorias | undefined>;
  delete(categoria: Categorias): Promise<Categorias>;
  save(data: ICreateCategoriaDTO): Promise<Categorias>;
}
