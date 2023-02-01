import { getRepository, Repository } from "typeorm";

import ICategoriasRepository from "@modules/categorias/repositories/ICategoriasRepository";
import ICreateCategoriaDTO from "@modules/categorias/dtos/ICreateCategoriaDTO";

import Categorias from "@modules/categorias/infra/typeorm/models/Categorias";

class CategoriasRepository implements ICategoriasRepository {
  private ormRepository: Repository<Categorias>;

  constructor() {
    this.ormRepository = getRepository(Categorias);
  }

  public async findByName(nome: string): Promise<Categorias | undefined> {
    const findCategoria = await this.ormRepository.findOne({
      where: { nome },
    });

    return findCategoria;
  }

  public async create(data: ICreateCategoriaDTO): Promise<Categorias> {
    const category = this.ormRepository.create(data);

    await this.ormRepository.save(category);

    return category;
  }

  public async list(): Promise<Categorias[]> {
    const all = await this.ormRepository.find();

    return all;
  }

  public async findById(id: number): Promise<Categorias | undefined> {
    const findCategoriaById = await this.ormRepository.findOne({
      where: { id },
    });

    return findCategoriaById;
  }

  public async delete(categoria: Categorias): Promise<Categorias> {
    const deleteCategoria = await this.ormRepository.remove(categoria);
    return deleteCategoria;
  }

  public async save(data: ICreateCategoriaDTO): Promise<Categorias> {
    return await this.ormRepository.save(data);
  }
}

export default CategoriasRepository;
