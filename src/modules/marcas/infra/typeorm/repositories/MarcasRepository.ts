import ICreateMarcaDTO from "@modules/marcas/dtos/ICreateMarcaDTO";
import IMarcasRepository from "@modules/marcas/repositories/IMarcasRepository";
import { getRepository, Repository } from "typeorm";

import Marca from "@modules/marcas/infra/typeorm/models/Marcas";

class MarcasRepository implements IMarcasRepository {
  private ormRepository: Repository<Marca>;

  constructor() {
    this.ormRepository = getRepository(Marca);
  }

  public async findByName(nome: string): Promise<Marca | undefined> {
    const findBrand = await this.ormRepository.findOne({
      where: { nome },
    });
    return findBrand;
  }

  public async create(data: ICreateMarcaDTO): Promise<Marca> {
    const marca = this.ormRepository.create(data);

    await this.ormRepository.save(marca);

    return marca;
  }

  public async list(): Promise<Marca[]> {
    const all = await this.ormRepository.find();

    return all;
  }

  public async delete(marca: Marca): Promise<Marca> {
    const deleteMarca = await this.ormRepository.remove(marca);
    return deleteMarca;
  }

  public async findById(id: number): Promise<Marca | undefined> {
    const findMarcaById = await this.ormRepository.findOne({
      where: { id },
    });

    return findMarcaById;
  }

  public async save(data: ICreateMarcaDTO): Promise<Marca> {
    return await this.ormRepository.save(data);
  }
}

export default MarcasRepository;
