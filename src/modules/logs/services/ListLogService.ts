import { injectable, inject } from "tsyringe";

import Logs from "@modules/logs/infra/typeorm/models/Logs";
import ILogsRepository from "@modules/logs/repositories/ILogsRepository";

@injectable()
class ListLogService {
  constructor(
    @inject("LogsRepository")
    private logsRepository: ILogsRepository,
  ) {}

  public async execute(): Promise<Logs[]> {
    const allLogs = await this.logsRepository.list();

    return allLogs;
  }
}

export default ListLogService;
