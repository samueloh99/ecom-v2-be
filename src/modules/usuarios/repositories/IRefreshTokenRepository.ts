import { DeleteResult } from "typeorm";
import RefreshToken from "../infra/typeorm/models/RefreshToken";

export default interface IUsuarioTokensRepository {
  generate(usuario_id: number): Promise<RefreshToken>;
  findRefreshTokenById(
    refreshTokenId: string
  ): Promise<RefreshToken | undefined>;
  deleteByUsuarioId(usuario_id: number): Promise<DeleteResult>;
}
