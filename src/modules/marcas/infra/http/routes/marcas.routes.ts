import { Router } from "express";

import MarcasController from "@modules/marcas/infra/http/controllers/MarcasController";
import ensureAuthenticated from "@modules/usuarios/infra/http/middlewares/ensureAthenticated";
import logRegister from "@shared/middlewares/logRegister";

const marcasRouter = Router();
const marcasController = new MarcasController();

marcasRouter.get("/todos", marcasController.list);

marcasRouter.post(
  "/",
  ensureAuthenticated,
  logRegister(["marcas", "adicionar"]),
  marcasController.create,
);

marcasRouter.delete(
  "/deletar/:id",
  ensureAuthenticated,
  logRegister(["marcas", "deletar"]),
  marcasController.delete,
);

marcasRouter.put(
  "/editar/:id",
  ensureAuthenticated,
  logRegister(["marcas", "editar"]),
  marcasController.update,
);

export default marcasRouter;
