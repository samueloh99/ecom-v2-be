import { Router } from "express";

import CategoriasController from "@modules/categorias/infra/http/controllers/CategoriasController";

import CategoriesBlingController from "../controllers/bling/CategoriesBlingController";

import logRegister from "@shared/middlewares/logRegister";
import ensureAuthenticated from "@modules/usuarios/infra/http/middlewares/ensureAthenticated";

const categoriasRouter = Router();

const categoriasController = new CategoriasController();
const categoriesBlingController = new CategoriesBlingController();

// BLING
categoriasRouter.post("/bling/categories", categoriesBlingController.create);

categoriasRouter.post(
  "/bling/categories_bulk",
  categoriesBlingController.create_bulk,
);

categoriasRouter.get("/bling/categories", categoriesBlingController.list);

// DATABASE

categoriasRouter.get("/todos", categoriasController.list);

categoriasRouter.post(
  "/",
  ensureAuthenticated,
  logRegister(["categoria", "adicionar"]),
  categoriasController.create,
);

categoriasRouter.patch(
  "/editar/:id",
  ensureAuthenticated,
  logRegister(["categoria", "atualizar"]),
  categoriasController.update,
);

categoriasRouter.delete(
  "/apagar/:id",
  ensureAuthenticated,
  logRegister(["categoria", "apagar"]),
  categoriasController.delete,
);

export default categoriasRouter;
