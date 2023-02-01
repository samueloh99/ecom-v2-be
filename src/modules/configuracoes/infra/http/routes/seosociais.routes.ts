import { Router } from "express";

import SeoSociaisController from "@modules/configuracoes/infra/http/controllers/SeoSociaisController";
import ensureAuthenticated from "@modules/usuarios/infra/http/middlewares/ensureAthenticated";
import logRegister from "@shared/middlewares/logRegister";

const seosociaisRouter = Router();

const seoSociaisController = new SeoSociaisController();

seosociaisRouter.get("/seosociais", seoSociaisController.list);

seosociaisRouter.post(
  "/seosociais",
  ensureAuthenticated,
  logRegister(["seosociais", "adicionar"]),
  seoSociaisController.create,
);

seosociaisRouter.patch(
  "/seosociais/editar/:id",
  ensureAuthenticated,
  logRegister(["seosociais", "editar"]),
  seoSociaisController.update,
);

seosociaisRouter.delete(
  "/seosociais/deletar/:id",
  ensureAuthenticated,
  logRegister(["seosociais", "deletar"]),
  seoSociaisController.delete,
);

export default seosociaisRouter;
