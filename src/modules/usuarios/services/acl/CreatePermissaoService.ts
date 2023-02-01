import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import IPermissoesRepository from "@modules/usuarios/repositories/IPermissoesRepository";

import Permissoes from "@modules/usuarios/infra/typeorm/models/Permissoes";

type IRequest = {
  nome: string;
  descricao: string;
};

@injectable()
class CreatePermissaoService {
  constructor(
    @inject("PermissoesRepository")
    private permissoesRepository: IPermissoesRepository,
  ) {}

  public async execute({ nome, descricao }: IRequest): Promise<Permissoes> {
    const role = await this.permissoesRepository.findPermissaoByNome(nome);

    if (role) {
      throw new AppError("Permissao já existe.");
    }

    const newRole = await this.permissoesRepository.create({ nome, descricao });

    return newRole;
  }
}

export default CreatePermissaoService;
