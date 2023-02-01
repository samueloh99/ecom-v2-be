import AppError from "@shared/errors/AppError";
import fetch from "node-fetch";

import ICreateUserRequest from "@shared/container/providers/Pagarme/dtos/Clientes/ICreateUserRequest";
import ICreateUserResponse from "@shared/container/providers/Pagarme/dtos/Clientes/ICreateUserResponse";
import IGetUserByIdResponse from "@shared/container/providers/Pagarme/dtos/Clientes/IGetUserByIdResponse";
import IListUsersResponse from "@shared/container/providers/Pagarme/dtos/Clientes/IListUsersResponse";

import IPagarmeUserProvider from "@shared/container/providers/Pagarme/models/IPagarmeUserProvider";

class PagarmeUserProvider implements IPagarmeUserProvider {
  constructor() {}

  public async update(
    {
      celular,
      email,
      nome,
      codigo_cliente,
      documento,
      genero,
      nascimento,
      telefone,
    }: ICreateUserRequest,
    customer_id: string,
  ): Promise<ICreateUserResponse> {
    const splitedBirthdate = nascimento.split("/");
    const birthdateFormated = new Date(
      `${splitedBirthdate[2]}/${splitedBirthdate[1]}/${splitedBirthdate[0]}`,
    ).toISOString();

    let generoFormatted = genero === "Masculino" ? "male" : "female";

    const clienteNovo = {
      name: nome,
      email,
      code: codigo_cliente,
      document: documento,
      type: "individual",
      document_type: "CPF",
      gender: generoFormatted,
      birthdate: birthdateFormated,
      phones: {
        home_phone: {
          country_code: "55",
          area_code: telefone.slice(0, 2),
          number: telefone.slice(2),
        },
        mobile_phone: {
          country_code: "55",
          area_code: celular.slice(0, 2),
          number: celular.slice(2),
        },
      },
    };

    try {
      const url = `https://api.pagar.me/core/v5/customers/${customer_id}`;
      const options = {
        method: "PUT",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(process.env.PAGARME_SECRET_KEY as string).toString(
              "base64",
            ),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clienteNovo),
      };

      const response = await fetch(url, options);
      const data: ICreateUserResponse = await response.json();

      return data;
    } catch (err) {
      throw new AppError("Erro ao Atualizar o Cliente.", 200);
    }
  }

  public async list(): Promise<IListUsersResponse> {
    try {
      const url = `https://api.pagar.me/core/v5/customers`;
      const options = {
        method: "GET",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(process.env.PAGARME_SECRET_KEY as string).toString(
              "base64",
            ),
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(url, options);
      const data: IListUsersResponse = await response.json();

      return data;
    } catch (err) {
      throw new AppError("Erro ao listar os Clientes.", 200);
    }
  }

  public async getByCustomerId(
    customer_id: string,
  ): Promise<IGetUserByIdResponse> {
    try {
      const url = `https://api.pagar.me/core/v5/customers/${customer_id}`;
      const options = {
        method: "GET",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(process.env.PAGARME_SECRET_KEY as string).toString(
              "base64",
            ),
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(url, options);
      const data: IGetUserByIdResponse = await response.json();

      return data;
    } catch (err) {
      throw new AppError("Erro ao listar o Cliente.", 200);
    }
  }

  public async post({
    celular,
    email,
    nome,
    codigo_cliente,
    documento,
    genero,
    nascimento,
    telefone,
  }: ICreateUserRequest): Promise<ICreateUserResponse> {
    const splitedBirthdate = nascimento.split("/");
    const birthdateFormated = new Date(
      `${splitedBirthdate[2]}/${splitedBirthdate[1]}/${splitedBirthdate[0]}`,
    ).toISOString();

    let generoFormatted = genero === "Masculino" ? "male" : "female";

    const clienteNovo = {
      name: nome,
      email,
      code: codigo_cliente,
      document: documento,
      type: "individual",
      document_type: "CPF",
      gender: generoFormatted,
      birthdate: birthdateFormated,
      phones: {
        home_phone: {
          country_code: "55",
          area_code: telefone.slice(0, 2),
          number: telefone.slice(2),
        },
        mobile_phone: {
          country_code: "55",
          area_code: celular.slice(0, 2),
          number: celular.slice(2),
        },
      },
    };

    try {
      const url = "https://api.pagar.me/core/v5/customers";
      const options = {
        method: "POST",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(process.env.PAGARME_SECRET_KEY as string).toString(
              "base64",
            ),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clienteNovo),
      };

      const response = await fetch(url, options);
      const data: ICreateUserResponse = await response.json();

      return data;
    } catch (err) {
      throw new AppError("Cadastro do cliente não realizado.", 200);
    }
  }
}

export default PagarmeUserProvider;
