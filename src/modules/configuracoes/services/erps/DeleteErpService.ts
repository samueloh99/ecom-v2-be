import { injectable, inject } from "tsyringe";

import Erp from "@modules/configuracoes/infra/typeorm/models/Erps";
import IErpsRepository from "@modules/configuracoes/repositories/IErpsRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: number;
}

@injectable()
class DeleteFornecedorService {
  constructor(
    @inject("ErpsRepository")
    private erpsRepository: IErpsRepository,
  ) {}

  public async execute(data: IRequest): Promise<Erp> {
    const checkIfErpExists = await this.erpsRepository.findById(data.id);

    if (!checkIfErpExists) {
      throw new AppError("ID not found.");
    }

    const deleteErp = await this.erpsRepository.delete(checkIfErpExists);

    return deleteErp;
  }
}

export default DeleteFornecedorService;
