import { injectable, inject } from "tsyringe";

import IDepositosRepository from "@modules/configuracoes/repositories/IDepositosRepository";
import Deposito from "@modules/configuracoes/infra/typeorm/models/Depositos";
import ICreateDepositoDTO from "@modules/configuracoes/dtos/ICreateDepositoDTO";

@injectable()
class CreateDepositoService {
  constructor(
    @inject("DepositosRepository")
    private depositosRepository: IDepositosRepository,
  ) {}

  public async execute({
    ativo,
    cep_deposito,
    cep_maximo,
    cep_minimo,
    lembrete,
  }: ICreateDepositoDTO): Promise<Deposito> {
    const newDeposito = await this.depositosRepository.create({
      ativo,
      cep_deposito,
      cep_maximo,
      cep_minimo,
      lembrete,
    });

    return newDeposito;
  }
}

export default CreateDepositoService;
