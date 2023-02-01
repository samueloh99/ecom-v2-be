import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateLOgService from "@modules/logs/services/CreateLogService";
import ListLogService from "@modules/logs/services/ListLogService";

export default class LogsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { responsavel, tela, acao } = request.body;

    const createLOgService = container.resolve(CreateLOgService);

    const newLog = await createLOgService.execute({
      responsavel,
      tela,
      acao,
    });

    return response.json(newLog);
  }

  public async list(_: Request, response: Response): Promise<Response> {
    const listLogService = container.resolve(ListLogService);
    const allLogs = await listLogService.execute();

    return response.json(allLogs);
  }
}
