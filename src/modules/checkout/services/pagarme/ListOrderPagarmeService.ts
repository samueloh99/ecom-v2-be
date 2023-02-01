import { injectable, inject } from "tsyringe";

import IPagarmeOrdersProvider from "@shared/container/providers/Pagarme/models/IPagarmeOrdersProvider";
import IPedidosRepository from "@modules/pedidos/repositories/IPedidosRepository";

@injectable()
class ListOrderPagarmeService {
  constructor(
    @inject("PagarmeOrdersProvider")
    private pagarmeOrdersProvider: IPagarmeOrdersProvider,

    @inject("PedidosRepository")
    private pedidosRepository: IPedidosRepository,
  ) {}

  public async execute(): Promise<void> {
    const orders = await this.pagarmeOrdersProvider.get();

    console.log(orders);

    // orders.data.map(async item => {
    //   const pedidoById = await this.pedidosRepository.findById(
    //     parseInt(item.metadata.pedido_id),
    //   );

    //   if (pedidoById) {
    //     console.log(item.status);
    //     // switch (item.status) {
    //     //   case "failed":
    //     //     pedidoById.status_pagamento = 6;
    //     //     break;

    //     //   case "pending":
    //     //     pedidoById.status_pagamento = 1;
    //     //     break;

    //     //   case "paid":
    //     //     pedidoById.status_pagamento = 3;
    //     //     break;

    //     //   case "canceled":
    //     //     pedidoById.status_pagamento = 6;
    //     //     break;

    //     //   default:
    //     //     break;
    //     // }
    //     console.log(pedidoById.status_pagamento);

    //     console.log("");
    //   }
    // });
  }
}

export default ListOrderPagarmeService;
