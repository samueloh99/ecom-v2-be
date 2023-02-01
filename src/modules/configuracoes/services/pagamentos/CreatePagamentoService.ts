import { injectable, inject } from "tsyringe";

import IPagamentosRepository from "@modules/configuracoes/repositories/IPagamentosRepository";
import Pagamento from "@modules/configuracoes/infra/typeorm/models/Pagamentos";
import ICreatePagamentoDTO from "@modules/configuracoes/dtos/ICreatePagamentoDTO";

@injectable()
class CreatePagamentoService {
  constructor(
    @inject("PagamentosRepository")
    private pagamentosRepository: IPagamentosRepository,
  ) {}

  public async execute({
    ativo,
    boleto_ativo,
    boleto_desconto,
    pix_ativo,
    pix_desconto,
    prazo_boleto,
    prazo_pix,
    public_key,
    secret_key,
  }: ICreatePagamentoDTO): Promise<Pagamento> {
    const pagamento = await this.pagamentosRepository.create({
      ativo,
      boleto_ativo,
      boleto_desconto,
      pix_ativo,
      pix_desconto,
      prazo_boleto,
      prazo_pix,
      public_key,
      secret_key,
    });

    return pagamento;
  }
}

export default CreatePagamentoService;
