import { injectable, inject } from "tsyringe";

import IBlingOrdersProvider from "@shared/container/providers/BlingERP/models/IBlingOrdersProvider";

@injectable()
class ListOrderBlingService {
  constructor(
    @inject("BlingOrdersProvider")
    private blingOrdersProvider: IBlingOrdersProvider,
  ) {}

  public async execute(): Promise<void> {
    return await this.blingOrdersProvider.getOrders();
  }
}

export default ListOrderBlingService;
