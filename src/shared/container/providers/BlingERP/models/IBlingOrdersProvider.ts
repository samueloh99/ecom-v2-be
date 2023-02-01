import ICreateOrder from "@shared/container/providers/BlingERP/dtos/ICreateOrder";
import { ICreateOrderResponse } from "@shared/container/providers/BlingERP/dtos/IBlingERPResponses";

export default interface IBlingOrdersProvider {
  get(): Promise<void>;
  post(pedido: ICreateOrder): Promise<ICreateOrderResponse>;
}
