import { injectable, inject } from "tsyringe";

import Deposito from "@modules/configuracoes/infra/typeorm/models/Depositos";
import IDepositosRepository from "@modules/configuracoes/repositories/IDepositosRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: number;
}

@injectable()
class DeleteDepositoService {
  constructor(
    @inject("DepositosRepository")
    private depositosRepository: IDepositosRepository,
  ) {}
  public async execute(data: IRequest): Promise<Deposito> {
    const checkIfDepositoExists = await this.depositosRepository.findById(
      data.id,
    );

    if (!checkIfDepositoExists) {
      throw new AppError("ID not found.");
    }

    const deleteDeposito = await this.depositosRepository.delete(
      checkIfDepositoExists,
    );

    return deleteDeposito;
  }
}

export default DeleteDepositoService;
