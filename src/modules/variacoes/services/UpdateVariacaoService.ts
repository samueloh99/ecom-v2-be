import { injectable, inject } from "tsyringe";

import Variacoes from "@modules/variacoes/infra/typeorm/models/Variacoes";
import IVariacoesRepository from "@modules/variacoes/repositories/IVariacoesRepository";
import AppError from "@shared/errors/AppError";

interface Request {
  id: number;
  nome: string;
  ativo: number;
  pai_id: number;
  cor_fundo: string;
  foto: string;
}

@injectable()
class UpdateVariacaoService {
  constructor(
    @inject("VariacoesRepository")
    private variacoesRepository: IVariacoesRepository,
  ) {}

  public async execute({
    id,
    nome,
    ativo,
    pai_id,
    cor_fundo,
    foto,
  }: Request): Promise<Variacoes> {
    const findById = await this.variacoesRepository.findById(id);

    if (!findById) {
      throw new AppError("Produto não encontrado.");
    }

    const newObj = {
      nome,
      ativo,
      pai_id,
      cor_fundo,
      foto,
    };

    Object.assign(findById, newObj);

    await this.variacoesRepository.save(findById);

    return findById;
  }
}

export default UpdateVariacaoService;
