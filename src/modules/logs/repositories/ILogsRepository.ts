import Logs from "@modules/logs/infra/typeorm/models/Logs";
import ICreateLogDTO from "@modules/logs/dtos/ICreateLogDTO";

export default interface ILogsRepository {
  create(data: ICreateLogDTO): Promise<Logs>;
  list(): Promise<Logs[]>;
}
