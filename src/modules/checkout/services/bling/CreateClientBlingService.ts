import { injectable, inject } from "tsyringe";

import IBlingClientsProvider from "@shared/container/providers/BlingERP/models/IBlingClientsProvider";
import ICreateClient from "@shared/container/providers/BlingERP/dtos/ICreateClient";
import { ICreateClientResponse } from "@shared/container/providers/BlingERP/dtos/IBlingERPResponses";

@injectable()
class CreateClientBlingService {
  constructor(
    @inject("BlingClientsProvider")
    private blingClientsProvider: IBlingClientsProvider,
  ) {}

  public async execute(data: ICreateClient): Promise<ICreateClientResponse> {
    const clients = await this.blingClientsProvider.post(data);

    if (clients.retorno.erros && clients.retorno.erros[0].erro.cod === 64) {
      const updateClient = await this.blingClientsProvider.put(data);

      return updateClient;
    }

    return clients;
  }
}

export default CreateClientBlingService;
