import { injectable, inject } from "tsyringe";

import Erp from "@modules/configuracoes/infra/typeorm/models/Erps";
import IErpsRepository from "@modules/configuracoes/repositories/IErpsRepository";
import AppError from "@shared/errors/AppError";

interface Request {
  id: number;
  ativo: number;
  api_key: string;
  codigo_deposito: string;
}

@injectable()
class UpdateErpService {
  constructor(
    @inject("ErpsRepository")
    private erpsRepository: IErpsRepository,
  ) {}

  public async execute({
    id,
    ativo,
    api_key,
    codigo_deposito,
  }: Request): Promise<Erp> {
    const findById = await this.erpsRepository.findById(id);

    if (!findById) {
      throw new AppError("Erp não encontrado.");
    }

    const newObj = {
      id,
      ativo,
      api_key,
      codigo_deposito,
    };

    Object.assign(findById, newObj);

    await this.erpsRepository.save(findById);

    return findById;
  }
}

export default UpdateErpService;
