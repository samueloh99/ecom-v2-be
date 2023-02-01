import { injectable, inject } from "tsyringe";

import ICarteirasRepository from "@modules/usuarios/repositories/ICarteirasRepository";

type IRequest = {
  id: number;
};

@injectable()
class ListTotalUsuarioService {
  constructor(
    @inject("CarteirasRepository")
    private carteirasRepository: ICarteirasRepository,
  ) {}

  public async execute({
    id,
  }: IRequest): Promise<{ usuario_id: number; total: number }> {
    const carteiraById = await this.carteirasRepository.findByUsuarioId(id);

    var total: number = 0;
    carteiraById.map(item => {
      if (item.movimentacao === "entrada") {
        total += item.valor_carteira;
      } else if (item.movimentacao === "saida") {
        total -= item.valor_carteira;
      }
    });

    const response = {
      usuario_id: id,
      total: total,
    };

    return response;
  }
}

export default ListTotalUsuarioService;
