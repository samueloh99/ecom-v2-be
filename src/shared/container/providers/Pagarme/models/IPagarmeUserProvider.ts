import ICreateUserRequest from "@shared/container/providers/Pagarme/dtos/Clientes/ICreateUserRequest";
import ICreateUserResponse from "@shared/container/providers/Pagarme/dtos/Clientes/ICreateUserResponse";
import IGetUserByIdResponse from "@shared/container/providers/Pagarme/dtos/Clientes/IGetUserByIdResponse";
import IListUsersResponse from "@shared/container/providers/Pagarme/dtos/Clientes/IListUsersResponse";

export default interface IPagarmeUserProvider {
  getByCustomerId(customer_id: string): Promise<IGetUserByIdResponse>;
  post(client: ICreateUserRequest): Promise<ICreateUserResponse>;
  list(): Promise<IListUsersResponse>;
  update(
    client: ICreateUserRequest,
    customer_id: string,
  ): Promise<ICreateUserResponse>;
}
