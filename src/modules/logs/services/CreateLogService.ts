import { injectable, inject } from "tsyringe";

import Logs from "@modules/logs/infra/typeorm/models/Logs";

import ILogsRepository from "@modules/logs/repositories/ILogsRepository";
import ICreateLogDTO from "@modules/logs/dtos/ICreateLogDTO";

@injectable()
class CreateLogService {
  constructor(
    @inject("LogsRepository")
    private logsRepository: ILogsRepository,
  ) {}

  public async execute(data: ICreateLogDTO): Promise<Logs> {
    const newLog = await this.logsRepository.create(data);

    return newLog;
  }
}

export default CreateLogService;
