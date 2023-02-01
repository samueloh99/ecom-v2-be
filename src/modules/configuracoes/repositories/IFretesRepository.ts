import Frete from "@modules/configuracoes/infra/typeorm/models/Fretes";
import ICreateFreteDTO from "@modules/configuracoes/dtos/ICreateFreteDTO";

export default interface IFretesRepository {
  create(data: ICreateFreteDTO): Promise<Frete>;
  list(): Promise<Frete[]>;
  delete(frete: Frete): Promise<Frete>;
  save(data: ICreateFreteDTO): Promise<Frete>;
  findById(id: number): Promise<Frete | undefined>;
}
