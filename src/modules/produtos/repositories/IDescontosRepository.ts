import Desconto from "@modules/produtos/infra/typeorm/models/Descontos";
import ICreateDescontoDTO from "@modules/produtos/dtos/ICreateDescontoDTO";

export default interface IDescontosRepository {
  create(data: ICreateDescontoDTO): Promise<Desconto>;
  delete(desconto: Desconto): Promise<Desconto>;
  list(): Promise<Desconto[]>;
  findByDescontoId(id: number): Promise<Desconto | undefined>;
  save(data: Desconto): Promise<Desconto>;
  findDescountByProductId(id: number): Promise<Desconto | undefined>;
}
