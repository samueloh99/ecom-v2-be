import { injectable, inject } from "tsyringe";

import IDescontosRepository from "@modules/produtos/repositories/IDescontosRepository";
import Desconto from "@modules/produtos/infra/typeorm/models/Descontos";
import AppError from "@shared/errors/AppError";

@injectable()
class DeleteDescontoService {
  constructor(
    @inject("DescontosRepository")
    private descontosRepository: IDescontosRepository,
  ) {}

  public async execute(id: number): Promise<Desconto> {
    const checkIfDescontoExists =
      await this.descontosRepository.findByDescontoId(id);

    if (checkIfDescontoExists === undefined) {
      throw new AppError("Desconto não existe.");
    }

    const deleteDesconto = await this.descontosRepository.delete(
      checkIfDescontoExists,
    );

    return deleteDesconto;
  }
}

export default DeleteDescontoService;
