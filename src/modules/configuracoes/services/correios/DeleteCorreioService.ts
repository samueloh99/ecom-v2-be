import { injectable, inject } from "tsyringe";

import ICorreiosRepository from "@modules/configuracoes/repositories/ICorreiosRepository";
import Correio from "@modules/configuracoes/infra/typeorm/models/Correios";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: number;
}

@injectable()
class DeleteCorreioService {
  constructor(
    @inject("CorreiosRepository")
    private correiosRepository: ICorreiosRepository,
  ) {}
  public async execute(data: IRequest): Promise<Correio> {
    const checkIfCorreioExists = await this.correiosRepository.findById(
      data.id,
    );

    if (!checkIfCorreioExists) {
      throw new AppError("ID not found.");
    }

    const deleteDeposito = await this.correiosRepository.delete(
      checkIfCorreioExists,
    );

    return deleteDeposito;
  }
}

export default DeleteCorreioService;
