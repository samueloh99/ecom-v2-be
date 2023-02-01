import { injectable, inject } from "tsyringe";

import ISeoSociaisRepository from "@modules/configuracoes/repositories/ISeoSociaisRepository";
import SeoSociais from "@modules/configuracoes/infra/typeorm/models/SeoSociais";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: number;
}

@injectable()
class DeleteSeoSociaisService {
  constructor(
    @inject("SeoSociaisRepository")
    private seoSociaisRepository: ISeoSociaisRepository,
  ) {}
  public async execute(data: IRequest): Promise<SeoSociais> {
    const checkIfSeoSociaisExists = await this.seoSociaisRepository.findById(
      data.id,
    );

    if (!checkIfSeoSociaisExists) {
      throw new AppError("ID not found.");
    }

    const deleteDeposito = await this.seoSociaisRepository.delete(
      checkIfSeoSociaisExists,
    );

    return deleteDeposito;
  }
}

export default DeleteSeoSociaisService;
