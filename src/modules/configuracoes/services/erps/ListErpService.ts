import { injectable, inject } from "tsyringe";

import IErpsRepository from "@modules/configuracoes/repositories/IErpsRepository";
import Erp from "@modules/configuracoes/infra/typeorm/models/Erps";

@injectable()
class ListErpService {
  constructor(
    @inject("ErpsRepository")
    private erpsRepository: IErpsRepository,
  ) {}

  public async execute(): Promise<Erp[]> {
    return await this.erpsRepository.list();
  }
}

export default ListErpService;
