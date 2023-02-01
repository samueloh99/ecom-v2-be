import { injectable, inject } from "tsyringe";

import Cupom from "@modules/cupons/infra/typeorm/models/Cupons";
import ICuponsRepository from "@modules/cupons/repositories/ICuponsRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: number;
}

@injectable()
class DeleteCupomService {
  constructor(
    @inject("CuponsRepository")
    private cuponsRepository: ICuponsRepository,
  ) {}

  public async execute(data: IRequest): Promise<Cupom> {
    const checkIfCupomExists = await this.cuponsRepository.findById(data.id);

    if (!checkIfCupomExists) {
      throw new AppError("ID not found.");
    }

    const deleteCupom = await this.cuponsRepository.delete(checkIfCupomExists);

    return deleteCupom;
  }
}

export default DeleteCupomService;
