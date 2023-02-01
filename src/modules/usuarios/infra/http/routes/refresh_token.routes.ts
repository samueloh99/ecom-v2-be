import { Router } from "express";

import RefreshTokenController from "@modules/usuarios/infra/http/controllers/RefreshTokenController";

const refreshTokenRouter = Router();
const refreshTokenController = new RefreshTokenController();

refreshTokenRouter.post("/", refreshTokenController.create);

export default refreshTokenRouter;
