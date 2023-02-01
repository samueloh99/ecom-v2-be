import { injectable, inject } from "tsyringe";

import Movimentacoes from "@modules/movimentacoes/infra/typeorm/models/Movimentacoes";
import IMovimentacoesRepository from "@modules/movimentacoes/repositories/IMovimentacoesRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  sku_id: number;
  lancamento: string;
  quantidade: number;
  localizacao: string;
}

@injectable()
class CreateMovimentacaoService {
  constructor(
    @inject("MovimentacoesRepository")
    private movimentacoesRepository: IMovimentacoesRepository
  ) {}

  public async execute({
    localizacao,
    quantidade,
    sku_id,
    lancamento,
  }: IRequest): Promise<Movimentacoes> {
    const findBySku = await this.movimentacoesRepository.findBySku(sku_id);

    if (!findBySku) {
      throw new AppError("Sku Não encontrado.");
    }

    const movimentacao = await this.movimentacoesRepository.create({
      localizacao,
      quantidade,
      sku_id,
      lancamento,
    });

    switch (lancamento) {
      case "balanco":
        await this.movimentacoesRepository.findBySkuAndBalanceStock({
          sku_id,
          quantidade,
        });
        break;

      case "entrada":
        await this.movimentacoesRepository.findBySkuAndAddStock({
          sku_id,
          quantidade,
        });
        break;

      case "saida":
        await this.movimentacoesRepository.findBySkuAndRemoveStock({
          sku_id,
          quantidade,
        });
        break;

      default:
        throw new AppError("Lançamento inválido");
    }

    return movimentacao;
  }
}

export default CreateMovimentacaoService;
