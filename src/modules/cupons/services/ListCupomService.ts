import { injectable, inject } from "tsyringe";

import Cupom from "@modules/cupons/infra/typeorm/models/Cupons";
import ICuponsRepository from "@modules/cupons/repositories/ICuponsRepository";
import IPedidosRepository from "@modules/pedidos/repositories/IPedidosRepository";

@injectable()
class ListCupomService {
  constructor(
    @inject("CuponsRepository")
    private cuponsRepository: ICuponsRepository,

    @inject("PedidosRepository")
    private pedidosRepository: IPedidosRepository,
  ) {}

  public async execute(): Promise<Cupom[]> {
    const allCupons = await this.cuponsRepository.list();

    const allPedidos = await this.pedidosRepository.listWithoutPagination();

    const count = allCupons.map(item => {
      return {
        ...item,
        total_pedidos: allPedidos.filter(
          pedidos => parseInt(pedidos.desconto_id) === item.id,
        ).length,
      };
    });

    return count;
  }
}

export default ListCupomService;
