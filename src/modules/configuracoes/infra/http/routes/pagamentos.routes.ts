import { Router } from "express";

import PagamentosController from "@modules/configuracoes/infra/http/controllers/PagamentosController";
import ensureAuthenticated from "@modules/usuarios/infra/http/middlewares/ensureAthenticated";
import logRegister from "@shared/middlewares/logRegister";

const pagamentosRouter = Router();

const pagamentosController = new PagamentosController();

pagamentosRouter.get("/pagamentos", pagamentosController.list);

pagamentosRouter.post(
  "/pagamentos",
  ensureAuthenticated,
  logRegister(["pagamentos", "adicionar"]),
  pagamentosController.create,
);

pagamentosRouter.patch(
  "/pagamentos/editar/:id",
  ensureAuthenticated,
  logRegister(["pagamentos", "editar"]),
  pagamentosController.update,
);

pagamentosRouter.delete(
  "/pagamentos/deletar/:id",
  ensureAuthenticated,
  logRegister(["pagamentos", "deletar"]),
  pagamentosController.delete,
);

export default pagamentosRouter;
