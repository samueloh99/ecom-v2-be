import Carteiras from "@modules/usuarios/infra/typeorm/models/Carteiras";
import ICreateCarteirasDTO from "@modules/usuarios/dtos/ICreateCarteirasDTO";

export default interface ICarteirasRepository {
  create(data: ICreateCarteirasDTO): Promise<Carteiras>;
  list(): Promise<Carteiras[]>;
  save(data: Carteiras): Promise<Carteiras>;
  delete(data: Carteiras): Promise<Carteiras>;
  findById(id: number): Promise<Carteiras | undefined>;
  findByUsuarioId(id: number): Promise<Carteiras[]>;
}
