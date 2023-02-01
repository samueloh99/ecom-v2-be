import { Router } from "express";

import FretesController from "@modules/configuracoes/infra/http/controllers/FretesController";
import ensureAuthenticated from "@modules/usuarios/infra/http/middlewares/ensureAthenticated";
import logRegister from "@shared/middlewares/logRegister";

const fretesRouter = Router();

const fretesController = new FretesController();

fretesRouter.get("/fretes", fretesController.list);

fretesRouter.post(
  "/fretes",
  ensureAuthenticated,
  logRegister(["fretes", "adicionar"]),
  fretesController.create,
);

fretesRouter.patch(
  "/fretes/editar/:id",
  ensureAuthenticated,
  logRegister(["fretes", "editar"]),
  fretesController.update,
);

fretesRouter.delete(
  "/fretes/deletar/:id",
  ensureAuthenticated,
  logRegister(["fretes", "deletar"]),
  fretesController.delete,
);

export default fretesRouter;
