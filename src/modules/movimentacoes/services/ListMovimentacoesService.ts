import { injectable, inject } from "tsyringe";

import Movimentacoes from "@modules/movimentacoes/infra/typeorm/models/Movimentacoes";
import IMovimentacoesRepository from "@modules/movimentacoes/repositories/IMovimentacoesRepository";

import {
  IRequest,
  IResponse,
} from "@modules/movimentacoes/dtos/IListMovimentacaoDTO";

@injectable()
class ListMovimentacoesService {
  constructor(
    @inject("MovimentacoesRepository")
    private movimentacoesRepository: IMovimentacoesRepository,
  ) {}

  public async execute({ currentPage, perPage }: IRequest): Promise<IResponse> {
    const all = this.movimentacoesRepository.list({
      currentPage,
      perPage,
    });

    return all;
  }
}

export default ListMovimentacoesService;
