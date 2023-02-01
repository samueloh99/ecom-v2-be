import { injectable, inject } from "tsyringe";

import ICorreiosRepository from "@modules/configuracoes/repositories/ICorreiosRepository";
import Correio from "@modules/configuracoes/infra/typeorm/models/Correios";
import ICreateCorreioDTO from "@modules/configuracoes/dtos/ICreateCorreioDTO";

@injectable()
class CreateCorreioService {
  constructor(
    @inject("CorreiosRepository")
    private correiosRepository: ICorreiosRepository,
  ) {}

  public async execute({
    ativo,
    cartao_postagem,
    central,
    cnpj,
    codigo_adm,
    pac_cod,
    sedex_cod,
    senha_sigep,
    titular,
    usuario_sigep,
  }: ICreateCorreioDTO): Promise<Correio> {
    const newCorreios = await this.correiosRepository.create({
      ativo,
      cartao_postagem,
      central,
      cnpj,
      codigo_adm,
      pac_cod,
      sedex_cod,
      senha_sigep,
      titular,
      usuario_sigep,
    });

    return newCorreios;
  }
}

export default CreateCorreioService;
