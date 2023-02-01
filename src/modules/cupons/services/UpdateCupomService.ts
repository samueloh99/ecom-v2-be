import { injectable, inject } from "tsyringe";

import Cupom from "@modules/cupons/infra/typeorm/models/Cupons";
import ICuponsRepository from "@modules/cupons/repositories/ICuponsRepository";

import AppError from "@shared/errors/AppError";

type CupomUpdateDTO = {
  id: number;
  tipo: number;
  ativo: number;
  data_1: Date;
  data_2: Date;
  nome: string;
  codigo: string;
  quantidade: number;
  desconto_tipo: string;
  desconto_valor: number;
  minimo_item: number;
  minimo_compra: number;
  frete_gratis: number;
  desconto_produto: number;
  desconto_pagamento: number;
  reutilizavel: number;
};

@injectable()
class UpdateCupomService {
  constructor(
    @inject("CuponsRepository")
    private cuponsRepository: ICuponsRepository,
  ) {}

  public async execute(data: CupomUpdateDTO): Promise<Cupom> {
    const findById = await this.cuponsRepository.findById(data.id);

    if (!findById) {
      throw new AppError("Cupom não encontrado.");
    }

    Object.assign(findById, data);

    await this.cuponsRepository.save(findById);

    return findById;
  }
}

export default UpdateCupomService;
