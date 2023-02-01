import { Router } from "express";

import CorreiosController from "@shared/container/providers/Correios/controllers/CorreiosController";

const correiosRouter = Router();

const correiosController = new CorreiosController();

correiosRouter.post("/frete_produto", correiosController.calcular);

export default correiosRouter;
