import { injectable, inject } from "tsyringe";

import { sign } from "jsonwebtoken";

import dayjs from "dayjs";

import AppError from "@shared/errors/AppError";

import IRefreshTokenRepository from "@modules/usuarios/repositories/IRefreshTokenRepository";

import authConfig from "@config/auth";

import RefreshToken from "@modules/usuarios/infra/typeorm/models/RefreshToken";

interface IResponse {
  token: string;
  newRefreshToken?: RefreshToken;
}

@injectable()
class CreateRefreshTokenService {
  constructor(
    @inject("RefreshTokenRepository")
    private refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  public async execute(refreshTokenId: string): Promise<IResponse> {
    const refreshTokenExists =
      await this.refreshTokenRepository.findRefreshTokenById(refreshTokenId);

    if (!refreshTokenExists) {
      throw new AppError("Refresh Token Inválido.");
    }

    const refreshTokenIsExpired = dayjs().isAfter(
      dayjs.unix(refreshTokenExists.expiresIn),
    );

    const { expiresIn, secret = "" } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: refreshTokenExists.usuario_id.toString(),
      expiresIn,
    });

    if (refreshTokenIsExpired) {
      await this.refreshTokenRepository.deleteByUsuarioId(
        refreshTokenExists.usuario_id,
      );

      const newRefreshToken = await this.refreshTokenRepository.generate(
        refreshTokenExists.usuario_id,
      );

      return { token, newRefreshToken };
    }

    return { token };
  }
}

export default CreateRefreshTokenService;
