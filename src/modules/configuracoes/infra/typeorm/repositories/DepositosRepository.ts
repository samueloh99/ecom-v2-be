import { getRepository, Repository } from "typeorm";

import ICreateDepositoDTO from "@modules/configuracoes/dtos/ICreateDepositoDTO";
import IDepositosRepository from "@modules/configuracoes/repositories/IDepositosRepository";
import Deposito from "@modules/configuracoes/infra/typeorm/models/Depositos";

class DepositosRepository implements IDepositosRepository {
  private ormRepository: Repository<Deposito>;

  constructor() {
    this.ormRepository = getRepository(Deposito);
  }
  public async create(data: ICreateDepositoDTO): Promise<Deposito> {
    const deposito = this.ormRepository.create(data);

    await this.ormRepository.save(deposito);

    return deposito;
  }
  public async list(): Promise<Deposito[]> {
    return await this.ormRepository.find();
  }
  public async delete(deposito: Deposito): Promise<Deposito> {
    return await this.ormRepository.remove(deposito);
  }
  public async save(data: ICreateDepositoDTO): Promise<Deposito> {
    return await this.ormRepository.save(data);
  }
  public async findById(id: number): Promise<Deposito | undefined> {
    return await this.ormRepository.findOne({ where: { id } });
  }
}

export default DepositosRepository;
