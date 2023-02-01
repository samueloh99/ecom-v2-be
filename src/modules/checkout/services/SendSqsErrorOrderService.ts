import { injectable, inject } from "tsyringe";

import IResponsePagarmeWebhookOrder from "@modules/checkout/dtos/IResponsePagarmeWebhookOrder";

import ISQSOrderErrorProvider from "@shared/container/providers/SQS/models/ISQSOrderErrorProvider";

interface IRequest {
  pedido_geral: string;
  usuario_id: string;
  pedido_id: string;
  usuario_id_pagarme: string;
  endereco_id: string;
  forma_pgto: string;
  parcela_numero: string;
  card_id_pagarme: string;
  card_cv: string;
}

@injectable()
class SendSqsErrorOrderService {
  constructor(
    @inject("SQSOrderErrorProvider")
    private sqsOrderErrorProvider: ISQSOrderErrorProvider,
  ) {}

  public async execute({
    pedido_geral,
    usuario_id,
    pedido_id,
    usuario_id_pagarme,
    endereco_id,
    forma_pgto,
    parcela_numero,
    card_id_pagarme,
    card_cv,
  }: IRequest): Promise<void> {
    const newObj = {
      pedido_geral,
      usuario_id,
      pedido_id,
      usuario_id_pagarme,
      endereco_id,
      forma_pgto,
      parcela_numero,
      card_id_pagarme,
      card_cv,
    };
    const stringfyCharge = JSON.stringify(newObj);

    await this.sqsOrderErrorProvider.post(stringfyCharge);
  }
}

export default SendSqsErrorOrderService;
