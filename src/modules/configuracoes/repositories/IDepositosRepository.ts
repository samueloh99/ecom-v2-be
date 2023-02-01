import Deposito from "@modules/configuracoes/infra/typeorm/models/Depositos";
import ICreateDepositoDTO from "@modules/configuracoes/dtos/ICreateDepositoDTO";

export default interface IDepositosRepository {
  create(data: ICreateDepositoDTO): Promise<Deposito>;
  list(): Promise<Deposito[]>;
  delete(deposito: Deposito): Promise<Deposito>;
  save(data: ICreateDepositoDTO): Promise<Deposito>;
  findById(id: number): Promise<Deposito | undefined>;
}
