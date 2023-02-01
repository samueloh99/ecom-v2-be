import { Router } from "express";

import multer from "multer";

import uploadConfig from "@config/upload";

import VariacoesController from "@modules/variacoes/infra/http/controllers/VariacoesController";
import ensureAuthenticated from "@modules/usuarios/infra/http/middlewares/ensureAthenticated";
import logRegister from "@shared/middlewares/logRegister";

const variacoesRouter = Router();

const variacoesController = new VariacoesController();

const upload = multer(uploadConfig.multer);

variacoesRouter.get("/", variacoesController.list);

variacoesRouter.post(
  "/foto/:id",
  upload.single("foto"),
  variacoesController.uploadFoto,
);

variacoesRouter.post(
  "/",
  ensureAuthenticated,
  logRegister(["variacoes", "adicionar"]),
  variacoesController.create,
);

variacoesRouter.patch("/editar/:id", variacoesController.update);

variacoesRouter.delete("/apagar/:id", variacoesController.delete);

export default variacoesRouter;
