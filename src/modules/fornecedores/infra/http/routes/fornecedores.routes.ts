import { Router } from "express";

import FornecedoresController from "@modules/fornecedores/infra/http/controllers/FornecedoresController";
import ensureAuthenticated from "@modules/usuarios/infra/http/middlewares/ensureAthenticated";
import logRegister from "@shared/middlewares/logRegister";

const fornecedoresRouter = Router();

const fornecedoresControllers = new FornecedoresController();

fornecedoresRouter.get("/todos", fornecedoresControllers.list);

fornecedoresRouter.post(
  "/",
  ensureAuthenticated,
  logRegister(["fornecedores", "adicionar"]),
  fornecedoresControllers.create,
);

fornecedoresRouter.put(
  "/editar/:id",
  ensureAuthenticated,
  logRegister(["fornecedores", "editar"]),
  fornecedoresControllers.update,
);

fornecedoresRouter.delete(
  "/deletar/:id",
  ensureAuthenticated,
  logRegister(["fornecedores", "deletar"]),
  fornecedoresControllers.delete,
);

export default fornecedoresRouter;
