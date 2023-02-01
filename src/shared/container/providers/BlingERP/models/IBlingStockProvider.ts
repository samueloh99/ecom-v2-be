import ICreateStock from "@shared/container/providers/BlingERP/dtos/ICreateStock";

export default interface IBlingStockProvider {
  get(): Promise<void>;
  post(deposito: ICreateStock): Promise<void>;
}
