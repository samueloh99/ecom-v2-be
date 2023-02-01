import { getRepository, Repository } from "typeorm";

import ICarteirasRepository from "@modules/usuarios/repositories/ICarteirasRepository";

import Carteira from "@modules/usuarios/infra/typeorm/models/Carteiras";

import ICreateCarteirasDTO from "@modules/usuarios/dtos/ICreateCarteirasDTO";

class CarteirasRepository implements ICarteirasRepository {
  private ormRepository: Repository<Carteira>;

  constructor() {
    this.ormRepository = getRepository(Carteira);
  }
  public async findByUsuarioId(id: number): Promise<Carteira[]> {
    const carteiraByUsuarioId = await this.ormRepository.find({
      where: { usuario_id: id },
    });

    return carteiraByUsuarioId;
  }

  public async create(data: ICreateCarteirasDTO): Promise<Carteira> {
    const newCarteira = await this.ormRepository.create(data);

    await this.ormRepository.save(newCarteira);

    return newCarteira;
  }

  public async list(): Promise<Carteira[]> {
    const allCarteiras = await this.ormRepository.find({
      relations: ["usuario_id_fk", "pedido_id_fk"],
    });

    return allCarteiras;
  }

  public async delete(data: Carteira): Promise<Carteira> {
    const findAndRemove = await this.ormRepository.remove(data);

    return findAndRemove;
  }

  public async findById(id: number): Promise<Carteira | undefined> {
    const findByIdCarteira = await this.ormRepository.findOne({
      where: { id },
    });

    return findByIdCarteira;
  }

  public async save(data: Carteira): Promise<Carteira> {
    return await this.ormRepository.save(data);
  }
}

export default CarteirasRepository;
