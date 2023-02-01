import Favorito from "@modules/skus/infra/typeorm/models/Favoritos";
import ICreateFavoritoDTO from "@modules/skus/dtos/ICreateFavoritoDTO";

export default interface IFavoritosRepository {
  create({ sku_id, usuario_id }: ICreateFavoritoDTO): Promise<Favorito>;
  list(): Promise<Favorito[]>;
  deleteFavorito(favorito: Favorito): Promise<Favorito>;
}
