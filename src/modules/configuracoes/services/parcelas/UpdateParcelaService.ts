import { injectable, inject } from "tsyringe";

import Parcela from "@modules/configuracoes/infra/typeorm/models/Parcelas";
import IParcelasRepository from "@modules/configuracoes/repositories/IParcelasRepository";
import AppError from "@shared/errors/AppError";

interface Request {
  id: number;
  ativo: number;
  parcela: number;
  tipo: string;
  taxa: number;
  valor: number;
}

@injectable()
class UpdateParcelaService {
  constructor(
    @inject("ParcelasRepository")
    private parcelasRepository: IParcelasRepository,
  ) {}

  public async execute({
    id,
    ativo,
    parcela,
    taxa,
    tipo,
    valor,
  }: Request): Promise<Parcela> {
    const findById = await this.parcelasRepository.findById(id);

    if (!findById) {
      throw new AppError("Parcela não encontrado.");
    }

    const newObj = {
      id,
      ativo,
      parcela,
      taxa,
      tipo,
      valor,
    };

    Object.assign(findById, newObj);

    await this.parcelasRepository.save(findById);

    return findById;
  }
}

export default UpdateParcelaService;
