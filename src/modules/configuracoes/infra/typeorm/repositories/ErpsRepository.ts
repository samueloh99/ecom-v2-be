import { getRepository, Repository } from "typeorm";

import ICreateErpDTO from "@modules/configuracoes/dtos/ICreateErpDTO";
import IErpsRepository from "@modules/configuracoes/repositories/IErpsRepository";
import Erp from "@modules/configuracoes/infra/typeorm/models/Erps";

class ErpsRespository implements IErpsRepository {
  private ormRepository: Repository<Erp>;

  constructor() {
    this.ormRepository = getRepository(Erp);
  }

  public async findById(id: number): Promise<Erp | undefined> {
    const erp = await this.ormRepository.findOne({ where: { id } });

    return erp;
  }

  public async create(data: ICreateErpDTO): Promise<Erp> {
    const erp = this.ormRepository.create(data);

    await this.ormRepository.save(erp);

    return erp;
  }

  public async list(): Promise<Erp[]> {
    const all = await this.ormRepository.find();

    return all;
  }

  public async delete(erp: Erp): Promise<Erp> {
    const deleteErp = await this.ormRepository.remove(erp);
    return deleteErp;
  }

  public async save(data: Erp): Promise<Erp> {
    return await this.ormRepository.save(data);
  }
}

export default ErpsRespository;
