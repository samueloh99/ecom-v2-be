import { Router } from "express";

import CarteirasController from "@modules/usuarios/infra/http/controllers/CarteirasController";

const carteirasRouter = Router();
const carteirasController = new CarteirasController();

carteirasRouter.get("/", carteirasController.list);
carteirasRouter.put("/editar", carteirasController.update);
carteirasRouter.post("/", carteirasController.create);
carteirasRouter.get("/total_usuario/:id", carteirasController.usuarioTotal);

export default carteirasRouter;
