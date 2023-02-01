import Correios from "@modules/configuracoes/infra/typeorm/models/Correios";
import ICreateCorreioDTO from "@modules/configuracoes/dtos/ICreateCorreioDTO";

export default interface ICorreiosRepository {
  create(data: ICreateCorreioDTO): Promise<Correios>;
  list(): Promise<Correios[]>;
  delete(correios: Correios): Promise<Correios>;
  save(data: ICreateCorreioDTO): Promise<Correios>;
  findById(id: number): Promise<Correios | undefined>;
}
