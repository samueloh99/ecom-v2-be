import { injectable, inject } from "tsyringe";

import Correio from "@modules/configuracoes/infra/typeorm/models/Correios";
import ICorreiosRepository from "@modules/configuracoes/repositories/ICorreiosRepository";

@injectable()
class ListDepositoService {
  constructor(
    @inject("CorreiosRepository")
    private correiosRepository: ICorreiosRepository,
  ) {}
  public async execute(): Promise<Correio[]> {
    return await this.correiosRepository.list();
  }
}

export default ListDepositoService;
