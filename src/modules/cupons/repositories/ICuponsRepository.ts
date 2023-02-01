import Cupom from "@modules/cupons/infra/typeorm/models/Cupons";
import ICreateCupomDTO from "@modules/cupons/dtos/ICreateCupomDTO";

export default interface ICuponsRepository {
  create(data: ICreateCupomDTO): Promise<Cupom>;
  list(): Promise<Cupom[]>;
  delete(data: Cupom): Promise<Cupom>;
  findByCodigo(codigo: string): Promise<Cupom | undefined>;
  findById(id: number): Promise<Cupom | undefined>;
  findByName(name: string): Promise<Cupom | undefined>;
  save(data: ICreateCupomDTO): Promise<Cupom>;
}
