import { injectable, inject } from "tsyringe";

import Marcas from "@modules/marcas/infra/typeorm/models/Marcas";
import IMarcasRepository from "@modules/marcas/repositories/IMarcasRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: number;
}

@injectable()
class DeleteMarcaService {
  constructor(
    @inject("MarcasRepository")
    private marcasRepository: IMarcasRepository
  ) {}

  public async execute(data: IRequest): Promise<Marcas> {
    const checkIfMarcaExists = await this.marcasRepository.findById(data.id);

    if (!checkIfMarcaExists) {
      throw new AppError("ID not found.");
    }

    const deleteMarca = await this.marcasRepository.delete(checkIfMarcaExists);

    return deleteMarca;
  }
}

export default DeleteMarcaService;
