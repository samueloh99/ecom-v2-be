import { Router } from "express";

import PermissoesController from "@modules/usuarios/infra/http/controllers/ACL/PermissoesController";

import ensureAuthenticated from "@modules/usuarios/infra/http/middlewares/ensureAthenticated";

const permissoesRouter = Router();
const permissoesController = new PermissoesController();

permissoesRouter.use(ensureAuthenticated);

permissoesRouter.post("/", permissoesController.create);

export default permissoesRouter;
