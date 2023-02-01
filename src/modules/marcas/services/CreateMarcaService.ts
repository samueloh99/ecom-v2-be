import { injectable, inject } from "tsyringe";

import Marca from "@modules/marcas/infra/typeorm/models/Marcas";
import IMarcassRepository from "@modules/marcas/repositories/IMarcasRepository";
import AppError from "@shared/errors/AppError";

interface Request {
  nome: string;
  ativo: number;
}

@injectable()
class CreateMarcaService {
  constructor(
    @inject("MarcasRepository")
    private marcasRepository: IMarcassRepository
  ) {}

  public async execute({ nome, ativo }: Request): Promise<Marca> {
    const findSameBrand = await this.marcasRepository.findByName(nome);

    if (findSameBrand) {
      throw new AppError("Essa marca ja foi cadastrado");
    }

    const marca = await this.marcasRepository.create({
      nome,
      ativo,
    });

    return marca;
  }
}

export default CreateMarcaService;
