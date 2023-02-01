import { Router } from "express";

import FavoritosController from "@modules/skus/infra/http/controllers/FavoritosController";

const favoritosRouter = Router();
const favoritosController = new FavoritosController();

favoritosRouter.post("/", favoritosController.create);

favoritosRouter.get("/todos", favoritosController.list);

favoritosRouter.delete("/apagar/:id", favoritosController.delete);

export default favoritosRouter;
