import { Router } from "express";

import DescontosController from "@modules/produtos/infra/http/controllers/DescontosController";

const descontosRouter = Router();
const descontosController = new DescontosController();

descontosRouter.get("/todos", descontosController.list);

descontosRouter.delete("/apagar/:id", descontosController.delete);

descontosRouter.post("/", descontosController.create);

descontosRouter.patch("/editar/:id", descontosController.update);

export default descontosRouter;
