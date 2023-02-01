import { Router } from "express";

import LogsController from "@modules/logs/infra/http/controllers/LogsController";

const logsRouter = Router();

const logsController = new LogsController();

logsRouter.get("/todos", logsController.list);

logsRouter.post("/", logsController.create);

export default logsRouter;
