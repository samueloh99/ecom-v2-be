import { Router } from "express";

import PerfisController from "@modules/usuarios/infra/http/controllers/ProfilesController";

import ensureAuthenticated from "@modules/usuarios/infra/http/middlewares/ensureAthenticated";

const profileRouter = Router();
const profileController = new PerfisController();

profileRouter.use(ensureAuthenticated);

profileRouter.get("/", profileController.show);
profileRouter.patch("/editar", profileController.update);

export default profileRouter;
