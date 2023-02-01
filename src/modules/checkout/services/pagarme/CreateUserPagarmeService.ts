import { injectable, inject } from "tsyringe";

import IPagarmeUserProvider from "@shared/container/providers/Pagarme/models/IPagarmeUserProvider";
import ICreateUserResponse from "@shared/container/providers/Pagarme/dtos/Clientes/ICreateUserResponse";

type IRequest = {
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
class CreateUserPagarmeService {
  constructor(
    @inject("PagarmeUserProvider")
    private pagarmeUserProvider: IPagarmeUserProvider,
  ) {}

  public async execute({
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

    const users = await this.pagarmeUserProvider.post({
      nascimento,
      celular,
      codigo_cliente,
      documento,
      email,
      genero,
      nome,
      telefone: formattedTelefone,
    });

    return users;
  }
}

export default CreateUserPagarmeService;
