import UserToken from "../infra/typeorm/models/UsuariosToken";

export default interface IUsuarioTokensRepository {
  generate(usuario_id: number): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}
