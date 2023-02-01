import { injectable, inject } from "tsyringe";

import Parcela from "@modules/configuracoes/infra/typeorm/models/Parcelas";
import IParcelasRepository from "@modules/configuracoes/repositories/IParcelasRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: number;
}

@injectable()
class DeleteParcelaService {
  constructor(
    @inject("ParcelasRepository")
    private parcelasRepository: IParcelasRepository,
  ) {}

  public async execute(data: IRequest): Promise<Parcela> {
    const checkIfParcelaExists = await this.parcelasRepository.findById(
      data.id,
    );

    if (!checkIfParcelaExists) {
      throw new AppError("ID not found.");
    }

    const deleteParcela = await this.parcelasRepository.delete(
      checkIfParcelaExists,
    );

    return deleteParcela;
  }
}

export default DeleteParcelaService;
