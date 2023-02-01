import { injectable, inject } from "tsyringe";

import Desconto from "@modules/produtos/infra/typeorm/models/Descontos";

import IDescontosRepository from "@modules/produtos/repositories/IDescontosRepository";

@injectable()
class ListDescontoService {
  constructor(
    @inject("DescontosRepository")
    private descontosRepository: IDescontosRepository
  ) {}

  public async execute(): Promise<Desconto[]> {
    const all = await this.descontosRepository.list();

    return all;
  }
}

export default ListDescontoService;
