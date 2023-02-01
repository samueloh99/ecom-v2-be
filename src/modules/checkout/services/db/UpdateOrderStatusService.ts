import { injectable, inject } from "tsyringe";

import IPedidosRepository from "@modules/pedidos/repositories/IPedidosRepository";
import ITransmissionsRepository from "@modules/checkout/repositories/ITransmissionsRepository";
import IResponsePagarmeWebhookOrder from "@modules/checkout/dtos/IResponsePagarmeWebhookOrder";
import Pedido from "@modules/pedidos/infra/typeorm/models/Pedidos";
import AppError from "errors/AppError";

@injectable()
class UpdateOrderStatusService {
  constructor(
    @inject("PedidosRepository")
    private pedidosRepository: IPedidosRepository,

    @inject("TransmissionsRepository")
    private transmissionsRepository: ITransmissionsRepository,
  ) {}

  public async execute(props: string | undefined): Promise<void> {
    if (!props) {
      console.log("sem mensagem na fila");
      throw new AppError("Sem mensagem na fila", 404);
    }

    const responseWebhook: IResponsePagarmeWebhookOrder = JSON.parse(props);

    await this.transmissionsRepository.create({
      message: props,
      pedido_id: parseInt(responseWebhook.data.metadata.pedido_id),
      usuario_id: parseInt(responseWebhook.data.metadata.pedido_id),
      servico: "PagarMe",
    });

    const pedido = await this.pedidosRepository.findById(
      parseInt(responseWebhook.data.metadata.pedido_id),
    );

    if (!pedido) {
      throw new AppError("Pedido não encontrado.", 404);
    }

    switch (responseWebhook.data.status) {
      case "failed":
        pedido.status_pagamento = 6;
        break;

      case "pending":
        pedido.status_pagamento = 1;
        break;

      case "paid":
        pedido.status_pagamento = 3;
        break;

      case "canceled":
        pedido.status_pagamento = 6;
        break;

      default:
        break;
    }

    await this.pedidosRepository.save(pedido);

    // return pedido;
  }
}

export default UpdateOrderStatusService;
