import ICreateUserAddress from "@shared/container/providers/Pagarme/dtos/Address/ICreateUserAddress";
import IGetUserAddressResponse from "@shared/container/providers/Pagarme/dtos/Address/IGetUserAddressResponse";
import ICreateUserAddressResponse from "@shared/container/providers/Pagarme/dtos/Address/ICreateUserAddressResponse";

export default interface IPagarmeUserAddressProvider {
  getByCustomerId(customer_id: string): Promise<IGetUserAddressResponse>;
  post(data: ICreateUserAddress): Promise<ICreateUserAddressResponse>;
}
