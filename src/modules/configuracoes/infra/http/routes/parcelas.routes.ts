import { Router } from "express";

import ParcelasController from "@modules/configuracoes/infra/http/controllers/ParcelasController";
import ensureAuthenticated from "@modules/usuarios/infra/http/middlewares/ensureAthenticated";
import logRegister from "@shared/middlewares/logRegister";

const parcelasRouter = Router();

const parcelasController = new ParcelasController();

parcelasRouter.get("/parcelas", parcelasController.list);

parcelasRouter.post(
  "/parcelas",
  ensureAuthenticated,
  logRegister(["parcelas", "adicionar"]),
  parcelasController.create,
);

parcelasRouter.patch(
  "/parcelas/editar/:id",
  ensureAuthenticated,
  logRegister(["parcelas", "editar"]),
  parcelasController.update,
);

parcelasRouter.delete(
  "/parcelas/deletar/:id",
  ensureAuthenticated,
  logRegister(["parcelas", "deletar"]),
  parcelasController.delete,
);

export default parcelasRouter;
