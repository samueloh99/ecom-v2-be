import { injectable, inject } from "tsyringe";

import IBlingProductsProvider from "@shared/container/providers/BlingERP/models/IBlingProductsProvider";

@injectable()
class ListProductBlingService {
  constructor(
    @inject("BlingProductsProvider")
    private blingProductsProvider: IBlingProductsProvider,
  ) {}

  public async execute(): Promise<void> {
    const allProducts = await this.blingProductsProvider.get();

    return allProducts;
  }
}

export default ListProductBlingService;
