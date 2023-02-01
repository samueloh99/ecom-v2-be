import { injectable, inject } from "tsyringe";

import Transmission from "@modules/checkout/infra/typeorm/models/Transmissions";
import ITransmissionsRepository from "@modules/checkout/repositories/ITransmissionsRepository";
import ICreateTransmissionDTO from "@modules/checkout/dtos/ICreateTransmissionDTO";

@injectable()
class ListTransmissionService {
  constructor(
    @inject("TransmissionsRepository")
    private transmissionsRepository: ITransmissionsRepository,
  ) {}

  public async execute(): Promise<Transmission[]> {
    const transmission = await this.transmissionsRepository.list();

    return transmission;
  }
}

export default ListTransmissionService;
