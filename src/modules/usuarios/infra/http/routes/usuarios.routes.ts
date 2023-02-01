import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import UsuariosController from "@modules/usuarios/infra/http/controllers/UsuariosController";

import UsuarioControleDeAcessoController from "@modules/usuarios/infra/http/controllers/UsuarioControleDeAcessoController";

import ensureAuthenticated from "@modules/usuarios/infra/http/middlewares/ensureAthenticated";

const usuariosRouter = Router();

const usuariosController = new UsuariosController();
const usuarioControleDeAcessoController =
  new UsuarioControleDeAcessoController();

usuariosRouter.get("/", usuariosController.list);

usuariosRouter.post("/", usuariosController.create);

usuariosRouter.put("/editar/:id", usuariosController.updateUser);

usuariosRouter.delete("/deletar/:id", usuariosController.delete);

usuariosRouter.post(
  "/senha",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  usuariosController.forgotPassword,
);

usuariosRouter.post(
  "/senha/redefinir",
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      senha: Joi.string().required(),
      senha_confirmation: Joi.string().required().valid(Joi.ref("senha")),
    },
  }),
  usuariosController.resetPassword,
);

usuariosRouter.post("/acl", usuarioControleDeAcessoController.create);

export default usuariosRouter;
