import convert from "xml-js";
import fetch from "node-fetch";

import ICreateClient from "@shared/container/providers/BlingERP/dtos/ICreateClient";
import { ICreateClientResponse } from "@shared/container/providers/BlingERP/dtos/IBlingERPResponses";

import IBlingClientsProvider from "@shared/container/providers/BlingERP/models/IBlingClientsProvider";

class BlingClientsProvider implements IBlingClientsProvider {
  constructor() {}

  public async get(): Promise<void> {
    const url = `https://bling.com.br/Api/v2/contatos/json?apikey=${process.env.BLING_API_KEY}`;

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    return data;
  }

  public async post(contato: ICreateClient): Promise<ICreateClientResponse> {
    var optionsXML = {
      compact: true,
      spaces: 4,
    };

    const xml_do_contato = convert.js2xml({ contato }, optionsXML);

    const url = `https://bling.com.br/Api/v2/contato/json?apikey=${process.env.BLING_API_KEY}&xml=${xml_do_contato}`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);
    const data: ICreateClientResponse = await response.json();

    return data;
  }

  public async put(contato: ICreateClient): Promise<ICreateClientResponse> {
    var optionsXML = {
      compact: true,
      spaces: 4,
    };

    const xml_do_contato = convert.js2xml({ contato }, optionsXML);

    const url = `https://bling.com.br/Api/v2/contato/${contato.codigo}/json?apikey=${process.env.BLING_API_KEY}&xml=${xml_do_contato}`;

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);
    const data: ICreateClientResponse = await response.json();

    return data;
  }
}

export default BlingClientsProvider;
