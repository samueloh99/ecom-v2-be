import { getRepository, Repository } from "typeorm";

import ICuponsRepository from "@modules/cupons/repositories/ICuponsRepository";
import ICreateCupomDTO from "@modules/cupons/dtos/ICreateCupomDTO";

import Cupom from "@modules/cupons/infra/typeorm/models/Cupons";

class CuponsRepository implements ICuponsRepository {
  private ormRepository: Repository<Cupom>;

  constructor() {
    this.ormRepository = getRepository(Cupom);
  }

  public async findByCodigo(codigo: string): Promise<Cupom | undefined> {
    const findCupomByCodigo = await this.ormRepository.findOne({
      where: { codigo },
    });

    return findCupomByCodigo;
  }

  public async findByName(nome: string): Promise<Cupom | undefined> {
    const findCupomByName = await this.ormRepository.findOne({
      where: { nome },
    });

    return findCupomByName;
  }

  public async create(data: ICreateCupomDTO): Promise<Cupom> {
    const newCupom = this.ormRepository.create(data);

    await this.ormRepository.save(newCupom);

    return newCupom;
  }

  public async list(): Promise<Cupom[]> {
    const allCupons = await this.ormRepository.find();

    return allCupons;
  }

  public async findById(id: number): Promise<Cupom | undefined> {
    const findCupomById = await this.ormRepository.findOne({
      where: { id },
    });

    return findCupomById;
  }

  public async delete(data: Cupom): Promise<Cupom> {
    const deleteCupom = await this.ormRepository.remove(data);
    return deleteCupom;
  }

  public async save(data: ICreateCupomDTO): Promise<Cupom> {
    return await this.ormRepository.save(data);
  }
}

export default CuponsRepository;
