import { injectable, inject } from "tsyringe";

import Frete from "@modules/configuracoes/infra/typeorm/models/Fretes";
import IFretesRepository from "@modules/configuracoes/repositories/IFretesRepository";
import AppError from "@shared/errors/AppError";

interface Request {
  id: number;
  ativo: number;
  lembrete: string;
  cep_minimo: string;
  cep_maximo: string;
  compra_minima: string;
  compra_maxima: string;
  valido_de: string;
  valido_ate: string;
}

@injectable()
class UpdateFreteService {
  constructor(
    @inject("FretesRepository")
    private fretesRepository: IFretesRepository,
  ) {}

  public async execute({
    id,
    ativo,
    lembrete,
    cep_minimo,
    cep_maximo,
    compra_minima,
    compra_maxima,
    valido_de,
    valido_ate,
  }: Request): Promise<Frete> {
    const findById = await this.fretesRepository.findById(id);

    if (!findById) {
      throw new AppError("Frete não encontrado.");
    }

    const newObj = {
      id,
      ativo,
      lembrete,
      cep_minimo,
      cep_maximo,
      compra_minima,
      compra_maxima,
      valido_de,
      valido_ate,
    };

    Object.assign(findById, newObj);

    await this.fretesRepository.save(findById);

    return findById;
  }
}

export default UpdateFreteService;
