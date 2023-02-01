import { injectable, inject } from "tsyringe";

import Favorito from "@modules/skus/infra/typeorm/models/Favoritos";

import IFavoritosRepository from "@modules/skus/repositories/IFavoritosRepository";

@injectable()
class ListFavoritoService {
  constructor(
    @inject("FavoritosRepository")
    private favoritosRepository: IFavoritosRepository
  ) {}

  public async execute(): Promise<Favorito[]> {
    const allFavoritos = await this.favoritosRepository.list();

    return allFavoritos;
  }
}

export default ListFavoritoService;
