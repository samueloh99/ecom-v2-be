import { injectable, inject } from "tsyringe";

import IErpsRepository from "@modules/configuracoes/repositories/IErpsRepository";
import Erp from "@modules/configuracoes/infra/typeorm/models/Erps";
import ICreateErpDTO from "@modules/configuracoes/dtos/ICreateErpDTO";

@injectable()
class CreateErpService {
  constructor(
    @inject("ErpsRepository")
    private erpsRepository: IErpsRepository,
  ) {}

  public async execute({
    ativo,
    codigo_deposito,
    api_key,
  }: ICreateErpDTO): Promise<Erp> {
    const erp = await this.erpsRepository.create({
      ativo,
      codigo_deposito,
      api_key,
    });

    return erp;
  }
}

export default CreateErpService;
