import { injectable, inject } from "tsyringe";

import IBlingCategoriesProvider from "@shared/container/providers/BlingERP/models/IBlingCategoriesProvider";

@injectable()
class ListCategoryBlingService {
  constructor(
    @inject("BlingCategoriesProvider")
    private blingCategoriesProvider: IBlingCategoriesProvider,
  ) {}

  public async execute(): Promise<void> {
    const allCategories = await this.blingCategoriesProvider.get();

    return allCategories;
  }
}

export default ListCategoryBlingService;
