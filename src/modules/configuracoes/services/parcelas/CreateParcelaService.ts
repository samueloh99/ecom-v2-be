import { injectable, inject } from "tsyringe";

import IParcelasRepository from "@modules/configuracoes/repositories/IParcelasRepository";
import Parcela from "@modules/configuracoes/infra/typeorm/models/Parcelas";
import ICreateParcelaDTO from "@modules/configuracoes/dtos/ICreateParcelaDTO";

@injectable()
class CreateParcelaervice {
  constructor(
    @inject("ParcelasRepository")
    private parcelasRepository: IParcelasRepository,
  ) {}

  public async execute({
    ativo,
    parcela,
    taxa,
    tipo,
    valor,
  }: ICreateParcelaDTO): Promise<Parcela> {
    const newParcela = await this.parcelasRepository.create({
      ativo,
      parcela,
      taxa,
      tipo,
      valor,
    });

    return newParcela;
  }
}

export default CreateParcelaervice;
