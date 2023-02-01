import { injectable, inject } from "tsyringe";

import IPagamentosRepository from "@modules/configuracoes/repositories/IPagamentosRepository";

@injectable()
class ListPagamentoService {
  constructor(
    @inject("PagamentosRepository")
    private pagamentosRepository: IPagamentosRepository,
  ) {}

  public async execute(): Promise<{
    prazo_boleto: number;
    prazo_pix: number;
    boleto_ativo: number;
    pix_desconto: number;
    pix_ativo: number;
    boleto_desconto: number;
  }> {
    const config = await this.pagamentosRepository.list();
    const withoutKey = {
      ativo: config[0].ativo,
      public_key: config[0].public_key,
      secret_key: config[0].secret_key,
      prazo_boleto: config[0].prazo_boleto,

      prazo_pix: config[0].prazo_pix,

      pix_desconto: config[0].pix_desconto,
      boleto_ativo: config[0].boleto_ativo,

      pix_ativo: config[0].pix_ativo,

      boleto_desconto: config[0].boleto_desconto,
    };
    return withoutKey;
  }
}

export default ListPagamentoService;
