import { injectable, inject } from "tsyringe";

import Favorito from "@modules/skus/infra/typeorm/models/Favoritos";

import IFavoritosRepository from "@modules/skus/repositories/IFavoritosRepository";
import AppError from "@shared/errors/AppError";

@injectable()
class DeleteFavoritoService {
  constructor(
    @inject("FavoritosRepository")
    private favoritosRepository: IFavoritosRepository,
  ) {}

  public async execute(id: number): Promise<Favorito> {
    const allFavoritos = await this.favoritosRepository.list();

    const checkIfFavoritosExists = allFavoritos.find(item => item.id === id);

    if (!checkIfFavoritosExists) {
      throw new AppError("Favoritado não existe.");
    }

    const deleteFavorito = await this.favoritosRepository.deleteFavorito(
      checkIfFavoritosExists,
    );

    return deleteFavorito;
  }
}

export default DeleteFavoritoService;
