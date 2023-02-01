import { injectable, inject } from "tsyringe";

import IBlingClientsProvider from "@shared/container/providers/BlingERP/models/IBlingClientsProvider";

@injectable()
class ListUserBlingService {
  constructor(
    @inject("BlingClientsProvider")
    private blingClientsProvider: IBlingClientsProvider,
  ) {}

  public async execute() {
    const clients = await this.blingClientsProvider.get();

    return clients;
  }
}

export default ListUserBlingService;
