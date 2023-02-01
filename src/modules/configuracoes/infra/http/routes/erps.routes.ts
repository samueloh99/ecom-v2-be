import { Router } from "express";

import ErpsController from "@modules/configuracoes/infra/http/controllers/ErpsController";
import ensureAuthenticated from "@modules/usuarios/infra/http/middlewares/ensureAthenticated";
import logRegister from "@shared/middlewares/logRegister";

const erpsRouter = Router();

const erpsController = new ErpsController();

erpsRouter.get("/erps", erpsController.list);

erpsRouter.post(
  "/erps",
  ensureAuthenticated,
  logRegister(["erps", "adicionar"]),
  erpsController.create,
);

erpsRouter.patch(
  "/erps/editar/:id",
  ensureAuthenticated,
  logRegister(["erps", "editar"]),
  erpsController.update,
);

erpsRouter.delete(
  "/erps/deletar/:id",
  ensureAuthenticated,
  logRegister(["erps", "deletar"]),
  erpsController.delete,
);

export default erpsRouter;
