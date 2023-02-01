import { getRepository, Repository } from "typeorm";

import ICreateFreteDTO from "@modules/configuracoes/dtos/ICreateFreteDTO";
import IFretesRepository from "@modules/configuracoes/repositories/IFretesRepository";
import Frete from "@modules/configuracoes/infra/typeorm/models/Fretes";

class FretesRepository implements IFretesRepository {
  private ormRepository: Repository<Frete>;

  constructor() {
    this.ormRepository = getRepository(Frete);
  }
  public async create(data: ICreateFreteDTO): Promise<Frete> {
    const frete = this.ormRepository.create(data);

    await this.ormRepository.save(frete);

    return frete;
  }
  public async list(): Promise<Frete[]> {
    const searchAllFretes = await this.ormRepository.find();

    return searchAllFretes;
  }
  public async delete(frete: Frete): Promise<Frete> {
    return await this.ormRepository.remove(frete);
  }
  public async save(data: ICreateFreteDTO): Promise<Frete> {
    const saveFrete = await this.ormRepository.save(data);
    return saveFrete;
  }
  public async findById(id: number): Promise<Frete | undefined> {
    const findFreteById = await this.ormRepository.findOne({ where: { id } });
    return findFreteById;
  }
}

export default FretesRepository;
