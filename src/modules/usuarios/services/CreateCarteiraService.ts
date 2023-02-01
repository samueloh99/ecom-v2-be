import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import ICarteirasRepository from "@modules/usuarios/repositories/ICarteirasRepository";
import IUsuariosRepository from "@modules/usuarios/repositories/IUsuariosRepository";

import Carteira from "@modules/usuarios/infra/typeorm/models/Carteiras";

import ICreateCarteirasDTO from "@modules/usuarios/dtos/ICreateCarteirasDTO";

@injectable()
class CreateCarteiraService {
  constructor(
    @inject("CarteirasRepository")
    private carteirasRepository: ICarteirasRepository,

    @inject("UsuariosRepository")
    private usuariosRepository: IUsuariosRepository,
  ) {}

  public async execute(data: ICreateCarteirasDTO): Promise<Carteira> {
    const findUser = await this.usuariosRepository.findById(data.usuario_id);

    if (findUser === undefined) {
      throw new AppError("Usuário não encontrado.", 200);
    }

    let newCarteira: Carteira;

    if (data.movimentacao === "saida") {
      newCarteira = await this.carteirasRepository.create({
        ...data,
        valor_carteira: -data.valor_carteira,
      });

      return newCarteira;
    }

    newCarteira = await this.carteirasRepository.create(data);

    return newCarteira;
  }
}

export default CreateCarteiraService;
