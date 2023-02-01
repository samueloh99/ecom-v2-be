import { injectable, inject } from "tsyringe";

import Variacoes from "@modules/variacoes/infra/typeorm/models/Variacoes";
import IVariacoesRepository from "@modules/variacoes/repositories/IVariacoesRepository";
import AppError from "@shared/errors/AppError";

interface Request {
  nome: string;
  ativo: number;
  pai_id: number;
  cor_fundo: string;
}

@injectable()
class CreateVariacaoService {
  constructor(
    @inject("VariacoesRepository")
    private variacoesRepository: IVariacoesRepository,
  ) {}

  public async execute({
    nome,
    ativo,
    pai_id,
    cor_fundo,
  }: Request): Promise<Variacoes> {
    const findSameNameVariation = await this.variacoesRepository.findByName(
      nome,
    );

    if (findSameNameVariation) {
      throw new AppError("Essa Variação ja foi cadastrada.");
    }

    const variacao = await this.variacoesRepository.create({
      nome,
      ativo,
      pai_id,
      cor_fundo,
    });

    return variacao;
  }
}

export default CreateVariacaoService;
