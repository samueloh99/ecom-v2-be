import Parcela from "@modules/configuracoes/infra/typeorm/models/Parcelas";
import ICreateParcelaDTO from "@modules/configuracoes/dtos/ICreateParcelaDTO";

export default interface IParcelasRepository {
  create(data: ICreateParcelaDTO): Promise<Parcela>;
  list(): Promise<Parcela[]>;
  delete(parcela: Parcela): Promise<Parcela>;
  save(data: ICreateParcelaDTO): Promise<Parcela>;
  findById(id: number): Promise<Parcela | undefined>;
}
