import { injectable, inject } from "tsyringe";

import Frete from "@modules/configuracoes/infra/typeorm/models/Fretes";
import IFretesRepository from "@modules/configuracoes/repositories/IFretesRepository";

@injectable()
class ListFreteService {
  constructor(
    @inject("FretesRepository")
    private fretesRepository: IFretesRepository,
  ) {}
  public async execute(): Promise<Frete[]> {
    const all = await this.fretesRepository.list();
    return all;
  }
}

export default ListFreteService;
