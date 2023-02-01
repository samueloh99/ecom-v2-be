import ICreateCartao from "@shared/container/providers/Pagarme/dtos/Cartao/ICreateCartao";
import ICreateCartaoResponse from "@shared/container/providers/Pagarme/dtos/Cartao/ICreateCartaoResponse";
import IGetUserCardsResponse from "@shared/container/providers/Pagarme/dtos/Cartao/IGetUserCardsResponse";

export default interface IPagarmeUserCardProvider {
  getByCustomerId(customer_id: string): Promise<IGetUserCardsResponse>;
  post(data: ICreateCartao): Promise<ICreateCartaoResponse>;
}
