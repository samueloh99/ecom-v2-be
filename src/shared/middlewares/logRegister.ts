import { NextFunction, Request, Response } from "express";

import { getRepository } from "typeorm";

import Logs from "@modules/logs/infra/typeorm/models/Logs";
import Usuarios from "@modules/usuarios/infra/typeorm/models/Usuarios";

export default function logRegister(data: string[]) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const usuariosRepo = getRepository(Usuarios);
    const logsRepo = getRepository(Logs);

    const findUsuario = await usuariosRepo.findOne({
      where: { id: request.usuario.id },
    });

    if (findUsuario) {
      const newObj = {
        acao: data[1],
        responsavel: findUsuario.nome_completo,
        tela: data[0],
      };
      const newLog = await logsRepo.create(newObj);
      await logsRepo.save(newLog);
    }

    return next();
  };
}
