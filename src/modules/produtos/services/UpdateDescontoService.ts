import { injectable, inject } from "tsyringe";

import IDescontosRepository from "@modules/produtos/repositories/IDescontosRepository";
import Desconto from "@modules/produtos/infra/typeorm/models/Descontos";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: number;
  produto_id: number;
  desconto_tipo: number;
  desconto_valor: number;
  data_desconto_1: Date;
  data_desconto_2: Date;
}

@injectable()
class UpdateDescontoService {
  constructor(
    @inject("DescontosRepository")
    private descontosRepository: IDescontosRepository
  ) {}

  public async execute(data: IRequest): Promise<Desconto> {
    const desconto = await this.descontosRepository.findByDescontoId(data.id);

    if (desconto === undefined) {
      throw new AppError("Desconto não encontrado.");
    }

    if (desconto) {
      Object.assign(desconto, data);
    }

    await this.descontosRepository.save(desconto);

    return desconto;
  }
}

export default UpdateDescontoService;
