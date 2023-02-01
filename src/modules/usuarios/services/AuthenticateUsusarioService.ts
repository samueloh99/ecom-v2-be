import { injectable, inject } from "tsyringe";

import { sign } from "jsonwebtoken";

import authConfig from "@config/auth";
import AppError from "@shared/errors/AppError";

import Usuario from "@modules/usuarios/infra/typeorm/models/Usuarios";

import IHashProvider from "@modules/usuarios/providers/HashProvider/models/IHashProvider";
import IUsuariosRepository from "@modules/usuarios/repositories/IUsuariosRepository";
import IRefreshTokenRepository from "@modules/usuarios/repositories/IRefreshTokenRepository";

interface Request {
  email: string;
  senha: string;
}

interface IResponse {
  usuario: Usuario;
  token: string;
  refreshTokenId: string;
}

@injectable()
class AuthenticateUsuarioService {
  constructor(
    @inject("UsuariosRepository")
    private usuarioRepository: IUsuariosRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider,

    @inject("RefreshTokenRepository")
    private refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  public async execute({ email, senha }: Request): Promise<IResponse> {
    const usuario = await this.usuarioRepository.findByEmail(email);

    if (!usuario) {
      throw new AppError("Email/Senha Incorretos", 401);
    }

    const senhaMatched = await this.hashProvider.compareHash(
      senha,
      usuario.senha,
    );

    if (!senhaMatched) {
      throw new AppError("Email/Senha Incorretos", 203);
    }

    const isAdmin =
      usuario.roles.filter(item => item.nome === "admin").length > 0;

    const { expiresIn, secret } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: `${usuario.id.toString()}/${isAdmin}`,
      expiresIn,
    });

    await this.refreshTokenRepository.deleteByUsuarioId(usuario.id);

    const refreshToken = await this.refreshTokenRepository.generate(usuario.id);

    const refreshTokenId = refreshToken.id;

    return { usuario, token, refreshTokenId };
  }
}

export default AuthenticateUsuarioService;
