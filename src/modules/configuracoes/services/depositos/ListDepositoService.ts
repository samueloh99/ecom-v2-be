import { injectable, inject } from "tsyringe";

import Deposito from "@modules/configuracoes/infra/typeorm/models/Depositos";
import IDepositosRepository from "@modules/configuracoes/repositories/IDepositosRepository";

@injectable()
class ListDepositoService {
  constructor(
    @inject("DepositosRepository")
    private depositosRepository: IDepositosRepository,
  ) {}
  public async execute(): Promise<Deposito[]> {
    return await this.depositosRepository.list();
  }
}

export default ListDepositoService;
