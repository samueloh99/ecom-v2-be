import { injectable, inject } from "tsyringe";

import Categoria from "@modules/categorias/infra/typeorm/models/Categorias";

import ICategoriasRepository from "@modules/categorias/repositories/ICategoriasRepository";

@injectable()
class ListCategoriaService {
  constructor(
    @inject("CategoriasRepository")
    private categoriasRepository: ICategoriasRepository
  ) {}

  public async execute(): Promise<Categoria[]> {
    const all = await this.categoriasRepository.list();

    return all;
  }
}

export default ListCategoriaService;
