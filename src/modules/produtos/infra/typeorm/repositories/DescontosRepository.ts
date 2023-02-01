import ICreateDescontoDTO from "@modules/produtos/dtos/ICreateDescontoDTO";
import IDescontosRepository from "@modules/produtos/repositories/IDescontosRepository";
import { getRepository, Repository } from "typeorm";

import Desconto from "@modules/produtos/infra/typeorm/models/Descontos";

class DescontosRepository implements IDescontosRepository {
  private ormRepository: Repository<Desconto>;

  constructor() {
    this.ormRepository = getRepository(Desconto);
  }

  public async findDescountByProductId(
    id: number,
  ): Promise<Desconto | undefined> {
    const descountByProductId = await this.ormRepository.findOne({
      where: { produto_id: id },
    });

    return descountByProductId;
  }

  public async save(data: Desconto): Promise<Desconto> {
    return await this.ormRepository.save(data);
  }

  public async delete(desconto: Desconto): Promise<Desconto> {
    const findDescontoAndDelete = await this.ormRepository.remove(desconto);

    return findDescontoAndDelete;
  }

  public async findByDescontoId(id: number): Promise<Desconto | undefined> {
    const desconto = await this.ormRepository.findOne({
      where: { id },
    });

    return desconto;
  }

  public async create(data: ICreateDescontoDTO): Promise<Desconto> {
    const desconto = await this.ormRepository.create(data);

    await this.ormRepository.save(desconto);

    return desconto;
  }

  public async list(): Promise<Desconto[]> {
    const all = await this.ormRepository.find();

    return all;
  }
}

export default DescontosRepository;
