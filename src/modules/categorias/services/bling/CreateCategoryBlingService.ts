import { injectable, inject } from "tsyringe";

import { ICreateCategoryResponse } from "@shared/container/providers/BlingERP/dtos/IBlingERPResponses";
import IBlingCategoriesProvider from "@shared/container/providers/BlingERP/models/IBlingCategoriesProvider";
import ICreateCategory from "@shared/container/providers/BlingERP/dtos/ICreateCategory";

@injectable()
class CreateCategoryBlingService {
  constructor(
    @inject("BlingCategoriesProvider")
    private blingCategoriesProvider: IBlingCategoriesProvider,
  ) {}

  public async execute(
    categoria: ICreateCategory,
  ): Promise<ICreateCategoryResponse> {
    const data = await this.blingCategoriesProvider.post(categoria);

    return data;
  }
}

export default CreateCategoryBlingService;
