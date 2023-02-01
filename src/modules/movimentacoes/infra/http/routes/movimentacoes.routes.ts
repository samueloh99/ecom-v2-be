import { Router } from "express";

import MovimentacoesController from "@modules/movimentacoes/infra/http/controllers/MovimentacoesController";

const movimentacaoRouter = Router();

const movimentacoesController = new MovimentacoesController();

movimentacaoRouter.get("/todos", movimentacoesController.list);

movimentacaoRouter.post("/", movimentacoesController.create);

export default movimentacaoRouter;
