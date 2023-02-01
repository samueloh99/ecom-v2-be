import { NextFunction, Request, Response } from "express";

import { getRepository } from "typeorm";

import Usuarios from "@modules/usuarios/infra/typeorm/models/Usuarios";

export default function isAdmin() {
  return async (request: Request, response: Response, next: NextFunction) => {
    // const usuariosRepo = getRepository(Usuarios);

    // const findUsuario = await usuariosRepo.findOne({
    //   where: { id: request.usuario.id },
    // });

    console.log(request.headers);

    return next();
  };
}
