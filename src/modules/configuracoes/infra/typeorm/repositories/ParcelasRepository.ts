import { getRepository, Repository } from "typeorm";

import ICreateParcelaDTO from "@modules/configuracoes/dtos/ICreateParcelaDTO";
import IParcelasRepository from "@modules/configuracoes/repositories/IParcelasRepository";
import Parcela from "@modules/configuracoes/infra/typeorm/models/Parcelas";

class ParcelasRepository implements IParcelasRepository {
  private ormRepository: Repository<Parcela>;

  constructor() {
    this.ormRepository = getRepository(Parcela);
  }
  public async create(data: ICreateParcelaDTO): Promise<Parcela> {
    const deposito = this.ormRepository.create(data);

    await this.ormRepository.save(deposito);

    return deposito;
  }
  public async list(): Promise<Parcela[]> {
    return await this.ormRepository.find();
  }
  public async delete(parcela: Parcela): Promise<Parcela> {
    return await this.ormRepository.remove(parcela);
  }
  public async save(data: ICreateParcelaDTO): Promise<Parcela> {
    return await this.ormRepository.save(data);
  }
  public async findById(id: number): Promise<Parcela | undefined> {
    return await this.ormRepository.findOne({ where: { id } });
  }
}

export default ParcelasRepository;
