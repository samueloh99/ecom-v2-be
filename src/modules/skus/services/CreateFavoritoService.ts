import { injectable, inject } from "tsyringe";

import Favorito from "@modules/skus/infra/typeorm/models/Favoritos";

import IFavoritosRepository from "@modules/skus/repositories/IFavoritosRepository";
import ISkusRepository from "@modules/skus/repositories/ISkusRepository";
import IUsuariosRepository from "@modules/usuarios/repositories/IUsuariosRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  sku_id: number;
  usuario_id: number;
}

@injectable()
class CreateFavoritoService {
  constructor(
    @inject("FavoritosRepository")
    private favoritosRepository: IFavoritosRepository,

    @inject("SkusRepository")
    private skusRepository: ISkusRepository,

    @inject("UsuariosRepository")
    private usuariosRepository: IUsuariosRepository
  ) {}

  public async execute({ usuario_id, sku_id }: IRequest): Promise<Favorito> {
    const findIfSkuExists = await this.skusRepository.findSkuById(sku_id);

    if (!findIfSkuExists) {
      throw new AppError("Produto não existe.");
    }

    const findIfUserExists = await this.usuariosRepository.findById(usuario_id);

    if (!findIfUserExists) {
      throw new AppError("Usuário não existe.");
    }

    const listFavoritos = await this.favoritosRepository.list();

    const findIfExist = listFavoritos.filter(
      (item) => item.usuario_id === usuario_id && item.sku_id === sku_id
    );

    if (findIfExist.length !== 0) {
      throw new AppError("Produto já favoritado.");
    }

    const createFavorito = await this.favoritosRepository.create({
      usuario_id,
      sku_id,
    });

    return createFavorito;
  }
}

export default CreateFavoritoService;
