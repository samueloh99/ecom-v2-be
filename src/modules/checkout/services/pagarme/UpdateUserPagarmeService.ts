import { injectable, inject } from "tsyringe";

import IPagarmeUserProvider from "@shared/container/providers/Pagarme/models/IPagarmeUserProvider";
import ICreateUserResponse from "@shared/container/providers/Pagarme/dtos/Clientes/ICreateUserResponse";

type IRequest = {
  customer_id: string;
  celular: string;
  email: string;
  nome: string;
  codigo_cliente: string;
  documento: string;
  genero: string;
  nascimento: string;
  telefone: string;
};

@injectable()
class UpdateUserPagarmeService {
  constructor(
    @inject("PagarmeUserProvider")
    private pagarmeUserProvider: IPagarmeUserProvider,
  ) {}

  public async execute({
    customer_id,
    celular,
    codigo_cliente,
    documento,
    email,
    genero,
    nome,
    nascimento,
    telefone,
  }: IRequest): Promise<ICreateUserResponse> {
    let formattedTelefone: string;

    if (!telefone) {
      formattedTelefone = "0000000000";
    } else {
      formattedTelefone = telefone;
    }

    const users = await this.pagarmeUserProvider.update(
      {
        celular,
        codigo_cliente,
        documento,
        email,
        genero,
        nome,
        nascimento,
        telefone: formattedTelefone,
      },
      customer_id,
    );

    return users;
  }
}

export default UpdateUserPagarmeService;
