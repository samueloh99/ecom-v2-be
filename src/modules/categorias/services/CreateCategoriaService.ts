import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import Categoria from "@modules/categorias/infra/typeorm/models/Categorias";

import ICategoriasRepository from "@modules/categorias/repositories/ICategoriasRepository";

interface IRequest {
  nome: string;
  pai_id: number;
  ativo: number;
  slug: string;
}

@injectable()
class CreateCategoriaService {
  constructor(
    @inject("CategoriasRepository")
    private categoriasRepository: ICategoriasRepository,
  ) {}

  public async execute({ nome, pai_id, ativo }: IRequest): Promise<Categoria> {
    const findSameCategory = await this.categoriasRepository.findByName(nome);

    if (findSameCategory) {
      throw new AppError("CATEGORIA ja cadastrado.");
    }

    let slugFormated = nome.toLocaleLowerCase().replace(/\s/g, "-");

    const categoria = await this.categoriasRepository.create({
      nome,
      pai_id,
      ativo,
      slug: slugFormated,
    });

    return categoria;
  }
}

export default CreateCategoriaService;
