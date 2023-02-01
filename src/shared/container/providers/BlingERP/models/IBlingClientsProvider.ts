import ICreateClient from "@shared/container/providers/BlingERP/dtos/ICreateClient";
import { ICreateClientResponse } from "../dtos/IBlingERPResponses";

export default interface IBlingClientsProvider {
  get(): Promise<void>;
  post(contato: ICreateClient): Promise<ICreateClientResponse>;
  put(contato: ICreateClient): Promise<ICreateClientResponse>;
}
