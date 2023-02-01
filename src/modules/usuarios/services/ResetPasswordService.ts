import { injectable, inject } from "tsyringe";
import { addHours, isAfter } from "date-fns";

import AppError from "@shared/errors/AppError";
import IUsuariosRepository from "@modules/usuarios/repositories/IUsuariosRepository";
import IUsuarioTokensRepository from "@modules/usuarios/repositories/IUsuarioTokensRepository";
import IHashProvider from "@modules/usuarios/providers/HashProvider/models/IHashProvider";

interface IRequest {
  token: string;
  senha: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject("UsuariosRepository")
    private usuariosRepository: IUsuariosRepository,

    @inject("UsuarioTokensRepository")
    private usuarioTokensRepository: IUsuarioTokensRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, senha }: IRequest): Promise<void> {
    const usuarioToken = await this.usuarioTokensRepository.findByToken(token);

    if (!usuarioToken) {
      throw new AppError("Usuario token não existe");
    }

    const usuario = await this.usuariosRepository.findById(
      usuarioToken.usuario_id,
    );

    if (!usuario) {
      throw new AppError("Usuario não existe", 203);
    }

    const tokenCreatedAt = usuarioToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError("Token expired");
    }

    usuario.senha = await this.hashProvider.generateHash(senha);

    await this.usuariosRepository.save(usuario);
  }
}

export default ResetPasswordService;
