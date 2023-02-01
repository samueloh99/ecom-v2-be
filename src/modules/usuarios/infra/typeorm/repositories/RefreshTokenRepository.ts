import { DeleteResult, getRepository, Repository } from "typeorm";

import IRefreshTokenRepository from "@modules/usuarios/repositories/IRefreshTokenRepository";

import RefreshToken from "@modules/usuarios/infra/typeorm/models/RefreshToken";

import dayjs from "dayjs";

class RefreshTokenRepository implements IRefreshTokenRepository {
  private ormRepository: Repository<RefreshToken>;

  constructor() {
    this.ormRepository = getRepository(RefreshToken);
  }
  public async deleteByUsuarioId(usuario_id: number): Promise<DeleteResult> {
    const findByIdAndDelete = await this.ormRepository.delete({ usuario_id });

    return findByIdAndDelete;
  }

  public async findRefreshTokenById(
    refreshTokenId: string
  ): Promise<RefreshToken | undefined> {
    const findRefreshTokenById = await this.ormRepository.findOne({
      where: { id: refreshTokenId },
    });

    return findRefreshTokenById;
  }

  public async generate(usuario_id: number): Promise<RefreshToken> {
    const expiresIn = dayjs().add(86400, "second").unix();

    const refreshToken = this.ormRepository.create({ usuario_id, expiresIn });

    await this.ormRepository.save(refreshToken);

    return refreshToken;
  }
}

export default RefreshTokenRepository;
