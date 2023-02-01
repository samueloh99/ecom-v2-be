import { injectable, inject } from "tsyringe";

import Correio from "@modules/configuracoes/infra/typeorm/models/Correios";
import ICorreiosRepository from "@modules/configuracoes/repositories/ICorreiosRepository";
import AppError from "@shared/errors/AppError";

interface Request {
  id: number;
  ativo: number;
  cnpj: string;
  cartao_postagem: string;
  codigo_adm: string;
  titular: string;
  central: string;
  usuario_sigep: string;
  senha_sigep: string;
  pac_cod: string;
  sedex_cod: string;
}

@injectable()
class UpdateCorreioService {
  constructor(
    @inject("CorreiosRepository")
    private correiosRepository: ICorreiosRepository,
  ) {}

  public async execute({
    id,
    ativo,
    cnpj,
    cartao_postagem,
    codigo_adm,
    titular,
    central,
    usuario_sigep,
    senha_sigep,
    pac_cod,
    sedex_cod,
  }: Request): Promise<Correio> {
    const findById = await this.correiosRepository.findById(id);

    if (!findById) {
      throw new AppError("Correio não encontrado.");
    }

    const newObj = {
      id,
      ativo,
      cnpj,
      cartao_postagem,
      codigo_adm,
      titular,
      central,
      usuario_sigep,
      senha_sigep,
      pac_cod,
      sedex_cod,
    };

    Object.assign(findById, newObj);

    await this.correiosRepository.save(findById);

    return findById;
  }
}

export default UpdateCorreioService;
