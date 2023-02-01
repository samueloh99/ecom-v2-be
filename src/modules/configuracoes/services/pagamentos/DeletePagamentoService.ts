import { injectable, inject } from "tsyringe";

import Pagamento from "@modules/configuracoes/infra/typeorm/models/Pagamentos";
import IPagamentosRepository from "@modules/configuracoes/repositories/IPagamentosRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: number;
}

@injectable()
class DeletePagamentoService {
  constructor(
    @inject("PagamentosRepository")
    private pagamentosRepository: IPagamentosRepository,
  ) {}

  public async execute(data: IRequest): Promise<Pagamento> {
    const checkIfPagamentoExists = await this.pagamentosRepository.findById(
      data.id,
    );

    if (!checkIfPagamentoExists) {
      throw new AppError("ID not found.");
    }

    const deletePagamento = await this.pagamentosRepository.delete(
      checkIfPagamentoExists,
    );

    return deletePagamento;
  }
}

export default DeletePagamentoService;
