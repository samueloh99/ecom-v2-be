import { injectable, inject } from "tsyringe";

import Frete from "@modules/configuracoes/infra/typeorm/models/Fretes";
import IFretesRepository from "@modules/configuracoes/repositories/IFretesRepository";
import ICreateFreteDTO from "@modules/configuracoes/dtos/ICreateFreteDTO";

@injectable()
class CreateFreteService {
  constructor(
    @inject("FretesRepository")
    private fretesRepository: IFretesRepository,
  ) {}

  public async execute({
    ativo,
    cep_maximo,
    cep_minimo,
    compra_maxima,
    compra_minima,
    lembrete,
    valido_ate,
    valido_de,
  }: ICreateFreteDTO): Promise<Frete> {
    const newFrete = await this.fretesRepository.create({
      ativo,
      cep_maximo,
      cep_minimo,
      compra_maxima,
      compra_minima,
      lembrete,
      valido_ate,
      valido_de,
    });

    return newFrete;
  }
}

export default CreateFreteService;
