import { injectable, inject } from "tsyringe";

import Variacoes from "@modules/variacoes/infra/typeorm/models/Variacoes";
import IVariacoesRepository from "@modules/variacoes/repositories/IVariacoesRepository";

@injectable()
class ListVariacaoService {
  constructor(
    @inject("VariacoesRepository")
    private variacoesRepository: IVariacoesRepository
  ) {}

  public async execute(): Promise<Variacoes[]> {
    const all = await this.variacoesRepository.list();

    return all;
  }
}

export default ListVariacaoService;
