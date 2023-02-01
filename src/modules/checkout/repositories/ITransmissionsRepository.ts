import Transmission from "@modules/checkout/infra/typeorm/models/Transmissions";
import ICreateTransmissionDTO from "@modules/checkout/dtos/ICreateTransmissionDTO";

export default interface ITransmissionsRepository {
  create(data: ICreateTransmissionDTO): Promise<Transmission>;
  list(): Promise<Transmission[]>;
}
