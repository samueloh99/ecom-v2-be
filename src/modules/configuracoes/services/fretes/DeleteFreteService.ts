import { injectable, inject } from "tsyringe";

import Frete from "@modules/configuracoes/infra/typeorm/models/Fretes";
import IFretesRepository from "@modules/configuracoes/repositories/IFretesRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: number;
}

@injectable()
class DeleteFreteService {
  constructor(
    @inject("FretesRepository")
    private fretesRepository: IFretesRepository,
  ) {}
  public async execute(data: IRequest): Promise<Frete> {
    const checkIfFreteExists = await this.fretesRepository.findById(data.id);

    if (!checkIfFreteExists) {
      throw new AppError("ID not found.");
    }

    const deleteDeposito = await this.fretesRepository.delete(
      checkIfFreteExists,
    );

    return deleteDeposito;
  }
}

export default DeleteFreteService;
