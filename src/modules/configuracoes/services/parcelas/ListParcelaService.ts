import { injectable, inject } from "tsyringe";

import IParcelasRepository from "@modules/configuracoes/repositories/IParcelasRepository";
import Parcela from "@modules/configuracoes/infra/typeorm/models/Parcelas";

@injectable()
class ListParcelaService {
  constructor(
    @inject("ParcelasRepository")
    private parcelasRepository: IParcelasRepository,
  ) {}

  public async execute(): Promise<Parcela[]> {
    return await this.parcelasRepository.list();
  }
}

export default ListParcelaService;
