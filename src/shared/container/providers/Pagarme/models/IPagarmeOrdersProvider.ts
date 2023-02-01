import ICreateOrderPixResponse from "@shared/container/providers/Pagarme/dtos/Pix/ICreateOrderPixResponse";
import ICreateOrderPix from "@shared/container/providers/Pagarme/dtos/Pix/ICreateOrderPix";

import ICreateOrderBoletoResponse from "@shared/container/providers/Pagarme/dtos/Boleto/ICreateOrderBoletoResponse";
import ICreateOrderBoleto from "@shared/container/providers/Pagarme/dtos/Boleto/ICreateOrderBoleto";

import ICreateOrderCartaoResponse from "@shared/container/providers/Pagarme/dtos/Cartao/ICreateOrderCartaoResponse";
import ICreateOrderCartao from "@shared/container/providers/Pagarme/dtos/Cartao/ICreateOrderCartao";

import IGetOrder from "@shared/container/providers/Pagarme/dtos/IGetOrder";

export default interface IPagarmeOrdersProvider {
  get(): Promise<IGetOrder>;
  post_pix(client: ICreateOrderPix): Promise<ICreateOrderPixResponse>;
  post_boleto(client: ICreateOrderBoleto): Promise<ICreateOrderBoletoResponse>;
  post_cartao(client: ICreateOrderCartao): Promise<ICreateOrderCartaoResponse>;
}
