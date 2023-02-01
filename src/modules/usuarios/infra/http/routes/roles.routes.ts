import { Router } from "express";

import RolesController from "@modules/usuarios/infra/http/controllers/ACL/RolesController";
import RolePermissoesController from "@modules/usuarios/infra/http/controllers/ACL/RolePermissoesController";

import ensureAuthenticated from "@modules/usuarios/infra/http/middlewares/ensureAthenticated";

const rolesRouter = Router();
const rolesController = new RolesController();
const rolesPermissoesController = new RolePermissoesController();

rolesRouter.post("/", rolesController.create);
rolesRouter.post("/:roleId", rolesPermissoesController.create);

export default rolesRouter;
