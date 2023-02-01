import { getRepository, Repository } from "typeorm";

import ICreateCorreioDTO from "@modules/configuracoes/dtos/ICreateCorreioDTO";
import ICorreiosRepository from "@modules/configuracoes/repositories/ICorreiosRepository";
import Correio from "@modules/configuracoes/infra/typeorm/models/Correios";

class CorreiosRepository implements ICorreiosRepository {
  private ormRepository: Repository<Correio>;

  constructor() {
    this.ormRepository = getRepository(Correio);
  }
  public async create(data: ICreateCorreioDTO): Promise<Correio> {
    const correios = this.ormRepository.create(data);

    await this.ormRepository.save(correios);

    return correios;
  }
  public async list(): Promise<Correio[]> {
    return await this.ormRepository.find();
  }
  public async delete(correios: Correio): Promise<Correio> {
    return await this.ormRepository.remove(correios);
  }
  public async save(data: ICreateCorreioDTO): Promise<Correio> {
    return await this.ormRepository.save(data);
  }
  public async findById(id: number): Promise<Correio | undefined> {
    return await this.ormRepository.findOne({ where: { id } });
  }
}

export default CorreiosRepository;
