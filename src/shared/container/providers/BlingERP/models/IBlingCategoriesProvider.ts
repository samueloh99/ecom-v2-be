import ICreateCategory from "@shared/container/providers/BlingERP/dtos/ICreateCategory";

import {
  ICreateCategoryResponse,
  IGetCategoryResponse,
} from "@shared/container/providers/BlingERP/dtos/IBlingERPResponses";

export default interface IBlingCategoriesProvider {
  get(): Promise<IGetCategoryResponse>;
  post(categoria: ICreateCategory): Promise<ICreateCategoryResponse>;
  get_category_id(id: number): Promise<ICreateCategoryResponse>;
}
