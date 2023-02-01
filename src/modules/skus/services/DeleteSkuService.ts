import { injectable, inject } from "tsyringe";

import { DeleteResult } from "typeorm";

import ISkusRepository from "@modules/skus/repositories/ISkusRepository";
import AppError from "@shared/errors/AppError";

@injectable()
class DeleteSkuService {
  constructor(
    @inject("SkusRepository")
    private skusRepository: ISkusRepository
  ) {}

  public async execute(id: number): Promise<DeleteResult> {
    const checkIfSkuExists = await this.skusRepository.findSkuById(id);

    if (!checkIfSkuExists) {
      throw new AppError("Sku ID não existe.");
    }
    const findSkuAndDelete = await this.skusRepository.deleteSkuById(id);

    return findSkuAndDelete;
  }
}

export default DeleteSkuService;
