import { Router } from "express";

import CorreiosController from "@modules/configuracoes/infra/http/controllers/CorreiosController";

const correiosRouter = Router();

const correiosController = new CorreiosController();

correiosRouter.get("/correios", correiosController.list);

correiosRouter.post("/correios", correiosController.create);

correiosRouter.patch("/correios/editar/:id", correiosController.update);

correiosRouter.delete("/correios/deletar/:id", correiosController.delete);

export default correiosRouter;
