import Erp from "@modules/configuracoes/infra/typeorm/models/Erps";
import ICreateErpDTO from "@modules/configuracoes/dtos/ICreateErpDTO";

export default interface IErpsRepository {
  create(data: ICreateErpDTO): Promise<Erp>;
  list(): Promise<Erp[]>;
  delete(erp: Erp): Promise<Erp>;
  save(data: ICreateErpDTO): Promise<Erp>;
  findById(id: number): Promise<Erp | undefined>;
}
