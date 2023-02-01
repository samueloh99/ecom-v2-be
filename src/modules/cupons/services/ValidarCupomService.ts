import { injectable, inject } from "tsyringe";

import ICuponsRepository from "@modules/cupons/repositories/ICuponsRepository";
import IPedidosRepository from "@modules/pedidos/repositories/IPedidosRepository";

type ValidarCupomDTO = {
  codigo: string;
  valor_carrinho: number;
  qtd_carrinho: number;
  usuario_id: number;
  produto_desconto: boolean;
  pagamento_desconto: boolean;
};

type Response = {
  valor: number;
  valido: boolean;
  tipo: string;
  frete_gratis: boolean;
  cupom_id: number | null;
  cupom_codigo: string;
};

@injectable()
class ValidarCupomService {
  constructor(
    @inject("CuponsRepository")
    private cuponsRepository: ICuponsRepository,

    @inject("PedidosRepository")
    private pedidosRepository: IPedidosRepository,
  ) {}

  public async execute({
    codigo,
    pagamento_desconto,
    produto_desconto,
    qtd_carrinho,
    usuario_id,
    valor_carrinho,
  }: ValidarCupomDTO): Promise<Response> {
    const findCupom = await this.cuponsRepository.findByCodigo(
      codigo.toLocaleLowerCase(),
    );

    if (findCupom === undefined) {
      return {
        valor: 0.0,
        valido: false,
        tipo: "",
        frete_gratis: false,
        cupom_id: null,
        cupom_codigo: "",
      };
    }

    if (findCupom.ativo === 0) {
      return {
        valor: 0.0,
        valido: false,
        tipo: "",
        frete_gratis: false,
        cupom_id: null,
        cupom_codigo: "",
      };
    }

    if (findCupom.quantidade === 0) {
      return {
        valor: 0.0,
        valido: false,
        tipo: "",
        frete_gratis: false,
        cupom_id: null,
        cupom_codigo: "",
      };
    }

    if (findCupom.desconto_pagamento !== 1 && pagamento_desconto) {
      return {
        valor: 0.0,
        valido: false,
        tipo: "",
        frete_gratis: false,
        cupom_id: null,
        cupom_codigo: "",
      };
    }

    if (findCupom.desconto_pagamento !== 1 && produto_desconto) {
      return {
        valor: 0.0,
        valido: false,
        tipo: "",
        frete_gratis: false,
        cupom_id: null,
        cupom_codigo: "",
      };
    }

    const pedidos =
      usuario_id &&
      (await this.pedidosRepository.findByUserId(usuario_id)).length;

    if (findCupom.reutilizavel === 0 && pedidos > 0) {
      return {
        valor: 0.0,
        valido: false,
        tipo: "",
        frete_gratis: false,
        cupom_id: null,
        cupom_codigo: "",
      };
    }

    const data1 = new Date(findCupom.data_1);
    const data2 = new Date(findCupom.data_2);
    const atual = new Date();

    if (atual > data2 || data1 > atual) {
      return {
        valor: 0.0,
        valido: false,
        tipo: "",
        frete_gratis: false,
        cupom_id: null,
        cupom_codigo: "",
      };
    }

    let freteGratis = findCupom.frete_gratis === 1 ? true : false;

    if (
      findCupom.minimo_compra > valor_carrinho ||
      findCupom.minimo_item > qtd_carrinho
    ) {
      return {
        valor: 0.0,
        valido: false,
        tipo: "",
        frete_gratis: freteGratis,
        cupom_id: null,
        cupom_codigo: "",
      };
    }

    return {
      valor: findCupom.desconto_valor,
      valido: true,
      tipo: findCupom.desconto_tipo,
      frete_gratis: freteGratis,
      cupom_id: findCupom.id,
      cupom_codigo: findCupom.codigo,
    };
  }
}

export default ValidarCupomService;
