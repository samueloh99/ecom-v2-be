import { injectable, inject } from "tsyringe";

import Transmission from "@modules/checkout/infra/typeorm/models/Transmissions";
import ITransmissionsRepository from "@modules/checkout/repositories/ITransmissionsRepository";
import ICreateTransmissionDTO from "@modules/checkout/dtos/ICreateTransmissionDTO";

@injectable()
class CreateTransmissionService {
  constructor(
    @inject("TransmissionsRepository")
    private transmissionsRepository: ITransmissionsRepository,
  ) {}

  public async execute(data: ICreateTransmissionDTO): Promise<Transmission> {
    const transmission = await this.transmissionsRepository.create(data);

    return transmission;
  }
}

export default CreateTransmissionService;
