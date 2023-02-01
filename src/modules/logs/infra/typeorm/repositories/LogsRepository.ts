import { getRepository, Repository } from "typeorm";

import ILogsRepository from "@modules/logs/repositories/ILogsRepository";
import ICreateLogDTO from "@modules/logs/dtos/ICreateLogDTO";

import Logs from "@modules/logs/infra/typeorm/models/Logs";

class LogsRepository implements ILogsRepository {
  private ormRepository: Repository<Logs>;

  constructor() {
    this.ormRepository = getRepository(Logs);
  }

  public async create(data: ICreateLogDTO): Promise<Logs> {
    const mewLog = this.ormRepository.create(data);

    await this.ormRepository.save(mewLog);

    return mewLog;
  }

  public async list(): Promise<Logs[]> {
    const allLogs = await this.ormRepository.find();

    return allLogs;
  }
}

export default LogsRepository;
