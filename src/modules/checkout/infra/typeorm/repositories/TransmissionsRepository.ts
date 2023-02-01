import { getRepository, Repository } from "typeorm";

import ITransmissionsRepository from "@modules/checkout/repositories/ITransmissionsRepository";
import ICreateTransmissionDTO from "@modules/checkout/dtos/ICreateTransmissionDTO";
import Transmissions from "@modules/checkout/infra/typeorm/models/Transmissions";

class TransmissionsRepository implements ITransmissionsRepository {
  private ormRepository: Repository<Transmissions>;

  constructor() {
    this.ormRepository = getRepository(Transmissions);
  }

  public async create(data: ICreateTransmissionDTO): Promise<Transmissions> {
    const transmission = await this.ormRepository.create(data);

    await this.ormRepository.save(transmission);

    return transmission;
  }

  public async list(): Promise<Transmissions[]> {
    const all = await this.ormRepository.find({
      relations: ["usuario_id_fk", "pedido_id_fk"],
    });

    return all;
  }
}

export default TransmissionsRepository;
