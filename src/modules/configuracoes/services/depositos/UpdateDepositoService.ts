import { injectable, inject } from "tsyringe";

import Deposito from "@modules/configuracoes/infra/typeorm/models/Depositos";
import IDepositosRepository from "@modules/configuracoes/repositories/IDepositosRepository";
import AppError from "@shared/errors/AppError";

interface Request {
  id: number;
  ativo: number;
  lembrete: string;
  cep_deposito: string;
  cep_minimo: string;
  cep_maximo: string;
}

@injectable()
class UpdateDepositoService {
  constructor(
    @inject("DepositosRepository")
    private depositosRepository: IDepositosRepository,
  ) {}

  public async execute({
    id,
    ativo,
    cep_deposito,
    cep_maximo,
    cep_minimo,
    lembrete,
  }: Request): Promise<Deposito> {
    const findById = await this.depositosRepository.findById(id);

    if (!findById) {
      throw new AppError("Deposito não encontrado.");
    }

    const newObj = {
      id,
      ativo,
      cep_deposito,
      cep_maximo,
      cep_minimo,
      lembrete,
    };

    Object.assign(findById, newObj);

    await this.depositosRepository.save(findById);

    return findById;
  }
}

export default UpdateDepositoService;
