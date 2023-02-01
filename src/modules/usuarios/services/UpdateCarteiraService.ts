import { injectable, inject } from "tsyringe";

import ICarteirasRepository from "@modules/usuarios/repositories/ICarteirasRepository";

import Carteira from "@modules/usuarios/infra/typeorm/models/Carteiras";

import AppError from "@shared/errors/AppError";

type IRequest = {
  id: number;

  movimentacao: string;

  valor_carteira: number;
};

@injectable()
class UpdateCarteiraService {
  constructor(
    @inject("CarteirasRepository")
    private carteirasRepository: ICarteirasRepository,
  ) {}

  public async execute({
    id,
    movimentacao,
    valor_carteira,
  }: IRequest): Promise<Carteira> {
    const findByID = await this.carteirasRepository.findById(id);

    if (!findByID) {
      throw new AppError("Carteira ID Não existe.", 200);
    }

    findByID.movimentacao = movimentacao;
    findByID.valor_carteira = valor_carteira;

    await this.carteirasRepository.save(findByID);

    return findByID;
  }
}

export default UpdateCarteiraService;
