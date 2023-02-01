import { ICreateProductResponse } from "@shared/container/providers/BlingERP/dtos/IBlingERPResponses";

import ICreateProduct from "@shared/container/providers/BlingERP/dtos/ICreateProduct";

export default interface IBlingProductsProvider {
  get(): Promise<void>;
  post(produto: ICreateProduct): Promise<ICreateProductResponse>;
}
