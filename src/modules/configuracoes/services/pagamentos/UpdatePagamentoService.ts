import { injectable, inject } from "tsyringe";

import Pagamento from "@modules/configuracoes/infra/typeorm/models/Pagamentos";
import IPagamentosRepository from "@modules/configuracoes/repositories/IPagamentosRepository";
import AppError from "@shared/errors/AppError";

interface Request {
  id: number;
  ativo: number;
  public_key: string;
  secret_key: string;
  prazo_boleto: number;
  prazo_pix: number;
  boleto_ativo: number;
  pix_ativo: number;
  boleto_desconto: number;
  pix_desconto: number;
}

@injectable()
class UpdatePagamentoService {
  constructor(
    @inject("PagamentosRepository")
    private pagamentosRepository: IPagamentosRepository,
  ) {}

  public async execute({
    id,
    ativo,
    boleto_ativo,
    boleto_desconto,
    pix_ativo,
    pix_desconto,
    prazo_boleto,
    prazo_pix,
    public_key,
    secret_key,
  }: Request): Promise<Pagamento> {
    const findById = await this.pagamentosRepository.findById(id);

    if (!findById) {
      throw new AppError("Pagamento não encontrado.");
    }

    const newObj = {
      id,
      ativo,
      boleto_ativo,
      boleto_desconto,
      pix_ativo,
      pix_desconto,
      prazo_boleto,
      prazo_pix,
      public_key,
      secret_key,
    };

    Object.assign(findById, newObj);

    await this.pagamentosRepository.save(findById);

    return findById;
  }
}

export default UpdatePagamentoService;
