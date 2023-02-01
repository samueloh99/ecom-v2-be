import { Router } from "express";

import EnderecosController from "@modules/usuarios/infra/http/controllers/EnderecosController";

const enderecosRouter = Router();

const enderecosController = new EnderecosController();

enderecosRouter.get("/", enderecosController.list);

enderecosRouter.post("/", enderecosController.create);

enderecosRouter.delete("/apagar/:id", enderecosController.delete);

enderecosRouter.patch("/editar/:id", enderecosController.update);

export default enderecosRouter;
