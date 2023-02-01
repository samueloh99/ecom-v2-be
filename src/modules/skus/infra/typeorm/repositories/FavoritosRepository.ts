import ICreateFavoritoDTO from "@modules/skus/dtos/ICreateFavoritoDTO";
import IFavoritosRepository from "@modules/skus/repositories/IFavoritosRepository";
import { getRepository, Repository } from "typeorm";

import Favorito from "@modules/skus/infra/typeorm/models/Favoritos";

class FavoritosRepository implements IFavoritosRepository {
  private ormRepository: Repository<Favorito>;

  constructor() {
    this.ormRepository = getRepository(Favorito);
  }

  public async deleteFavorito(favorito: Favorito): Promise<Favorito> {
    const deleteFavorito = await this.ormRepository.remove(favorito);

    return deleteFavorito;
  }

  public async create(data: ICreateFavoritoDTO): Promise<Favorito> {
    const favorito = await this.ormRepository.create(data);

    await this.ormRepository.save(favorito);

    return favorito;
  }

  public async list(): Promise<Favorito[]> {
    const all = await this.ormRepository
      .createQueryBuilder("favoritos")
      .innerJoinAndSelect("favoritos.sku_id_fk", "sku_id_fk")
      .innerJoinAndSelect("sku_id_fk.produto", "produto")
      .innerJoinAndSelect("sku_id_fk.var1fk", "var1fk")
      .innerJoinAndSelect("sku_id_fk.var2fk", "var2fk")
      .getMany();

    return all;
  }
}

export default FavoritosRepository;
