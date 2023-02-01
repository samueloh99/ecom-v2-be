import { Router } from "express";

import CuponsController from "@modules/cupons/infra/http/controllers/CuponsController";
import ensureAuthenticated from "@modules/usuarios/infra/http/middlewares/ensureAthenticated";
import logRegister from "@shared/middlewares/logRegister";

const cuponsRouter = Router();

const cuponsController = new CuponsController();

cuponsRouter.get("/todos", cuponsController.list);

cuponsRouter.post(
  "/",
  ensureAuthenticated,
  logRegister(["cupons", "adicionar"]),
  cuponsController.create,
);

cuponsRouter.patch(
  "/editar/:id",
  ensureAuthenticated,
  logRegister(["cupons", "editar"]),
  cuponsController.update,
);

cuponsRouter.delete(
  "/apagar/:id",
  ensureAuthenticated,
  logRegister(["cupons", "apagar"]),
  cuponsController.delete,
);

cuponsRouter.post("/validar", cuponsController.validar);

export default cuponsRouter;
