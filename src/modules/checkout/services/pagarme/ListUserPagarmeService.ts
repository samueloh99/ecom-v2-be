import { injectable, inject } from "tsyringe";

import IPagarmeUserProvider from "@shared/container/providers/Pagarme/models/IPagarmeUserProvider";
import IListUsersResponse from "@shared/container/providers/Pagarme/dtos/Clientes/IListUsersResponse";

@injectable()
class ListUserPagarmeService {
  constructor(
    @inject("PagarmeUserProvider")
    private pagarmeUserProvider: IPagarmeUserProvider,
  ) {}

  public async execute(): Promise<IListUsersResponse> {
    const clients = await this.pagarmeUserProvider.list();

    return clients;
  }
}

export default ListUserPagarmeService;
