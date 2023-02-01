import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import Cupom from "@modules/cupons/infra/typeorm/models/Cupons";

import ICuponsRepository from "@modules/cupons/repositories/ICuponsRepository";
import ICreateCupomDTO from "../dtos/ICreateCupomDTO";

@injectable()
class CreateCupomService {
  constructor(
    @inject("CuponsRepository")
    private cuponsRepository: ICuponsRepository,
  ) {}

  public async execute(data: ICreateCupomDTO): Promise<Cupom> {
    const findCupomWithSameNome = await this.cuponsRepository.findByName(
      data.nome,
    );

    if (findCupomWithSameNome) {
      throw new AppError("Já existe cupom com esse nome.");
    }

    const findCupomWithSameCodigo = await this.cuponsRepository.findByCodigo(
      data.codigo,
    );

    if (findCupomWithSameCodigo) {
      throw new AppError("Já existe cupom com esse código.");
    }

    const newCupom = await this.cuponsRepository.create(data);

    return newCupom;
  }
}

export default CreateCupomService;
