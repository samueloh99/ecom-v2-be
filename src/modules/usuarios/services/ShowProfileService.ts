import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import Usuario from "@modules/usuarios/infra/typeorm/models/Usuarios";
import IUsuariosRepository from "@modules/usuarios/repositories/IUsuariosRepository";

interface IRequest {
  id: number;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject("UsuariosRepository")
    private usuariosRepository: IUsuariosRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findById(id);

    if (!usuario) {
      throw new AppError("Usuário not found");
    }

    return usuario;
  }
}

export default ShowProfileService;
