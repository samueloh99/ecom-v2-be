import { getRepository, Repository } from "typeorm";

import ICreateSeoSociaisDTO from "@modules/configuracoes/dtos/ICreateSeoSociaisDTO";
import ISeoSociaisRepository from "@modules/configuracoes/repositories/ISeoSociaisRepository";
import SeoSociais from "@modules/configuracoes/infra/typeorm/models/SeoSociais";

class SeoSociaisRepository implements ISeoSociaisRepository {
  private ormRepository: Repository<SeoSociais>;

  constructor() {
    this.ormRepository = getRepository(SeoSociais);
  }
  public async create(data: ICreateSeoSociaisDTO): Promise<SeoSociais> {
    const seosociais = this.ormRepository.create(data);

    await this.ormRepository.save(seosociais);
    return seosociais;
  }
  public async list(): Promise<SeoSociais[]> {
    return await this.ormRepository.find();
  }
  public async delete(seosociais: SeoSociais): Promise<SeoSociais> {
    return await this.ormRepository.remove(seosociais);
  }
  public async save(data: ICreateSeoSociaisDTO): Promise<SeoSociais> {
    return await this.ormRepository.save(data);
  }
  public async findById(id: number): Promise<SeoSociais | undefined> {
    return await this.ormRepository.findOne({ where: { id } });
  }
}

export default SeoSociaisRepository;
