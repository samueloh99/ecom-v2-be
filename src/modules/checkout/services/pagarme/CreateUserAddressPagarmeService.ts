import { injectable, inject } from "tsyringe";

import IPagarmeUserAddressProvider from "@shared/container/providers/Pagarme/models/IPagarmeUserAddressProvider";
import ICreateUserAddressResponse from "@shared/container/providers/Pagarme/dtos/Address/ICreateUserAddressResponse";

type IRequest = {
  bairro: string;
  cep: string;
  cidade: string;
  complemento: string;
  customer_id: string;
  destinatario: string;
  endereco: string;
  estado: string;
  numero: string;
  referencia: string;
};

@injectable()
class CreateUserAddressPagarmeService {
  constructor(
    @inject("PagarmeUserAddressProvider")
    private pagarmeUserAddressProvider: IPagarmeUserAddressProvider,
  ) {}

  public async execute({
    bairro,
    cep,
    cidade,
    complemento,
    customer_id,
    destinatario,
    endereco,
    estado,
    numero,
    referencia,
  }: IRequest): Promise<ICreateUserAddressResponse> {
    const usersAddress = await this.pagarmeUserAddressProvider.post({
      bairro,
      cep,
      cidade,
      complemento,
      customer_id,
      destinatario,
      endereco,
      estado,
      numero,
      referencia,
    });

    return usersAddress;
  }
}

export default CreateUserAddressPagarmeService;
