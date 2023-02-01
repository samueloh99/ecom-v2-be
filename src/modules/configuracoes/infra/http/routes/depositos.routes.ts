import { Router } from "express";

import DepositosController from "@modules/configuracoes/infra/http/controllers/DepositosController";
import ensureAuthenticated from "@modules/usuarios/infra/http/middlewares/ensureAthenticated";
import logRegister from "@shared/middlewares/logRegister";

const depositosRouter = Router();

const depositosController = new DepositosController();

depositosRouter.get("/depositos", depositosController.list);

depositosRouter.post(
  "/depositos",
  ensureAuthenticated,
  logRegister(["depositos", "adicionar"]),
  depositosController.create,
);

depositosRouter.patch(
  "/depositos/editar/:id",
  ensureAuthenticated,
  logRegister(["depositos", "editar"]),
  depositosController.update,
);

depositosRouter.delete(
  "/depositos/deletar/:id",
  ensureAuthenticated,
  logRegister(["depositos", "deletar"]),
  depositosController.delete,
);

export default depositosRouter;
