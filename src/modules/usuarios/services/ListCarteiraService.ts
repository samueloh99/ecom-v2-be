import { injectable, inject } from "tsyringe";

import ICarteirasRepository from "@modules/usuarios/repositories/ICarteirasRepository";

import Carteira from "@modules/usuarios/infra/typeorm/models/Carteiras";

@injectable()
class ListCarteiraService {
  constructor(
    @inject("CarteirasRepository")
    private carteirasRepository: ICarteirasRepository,
  ) {}

  public async execute(): Promise<Carteira[]> {
    const all = await this.carteirasRepository.list();

    return all;
  }
}

export default ListCarteiraService;
