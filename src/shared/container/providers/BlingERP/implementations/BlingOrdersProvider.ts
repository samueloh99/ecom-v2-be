import convert from "xml-js";
import fetch from "node-fetch";

import ICreateOrder from "@shared/container/providers/BlingERP/dtos/ICreateOrder";
import { ICreateOrderResponse } from "@shared/container/providers/BlingERP/dtos/IBlingERPResponses";
import IBlingOrdersProvider from "@shared/container/providers/BlingERP/models/IBlingOrdersProvider";
class BlingOrdersProvider implements IBlingOrdersProvider {
  constructor() {}

  public async get(): Promise<void> {
    const url = `https://bling.com.br/Api/v2/pedidos/json?apikey=${process.env.BLING_API_KEY}`;

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

  public async post(pedido: ICreateOrder): Promise<ICreateOrderResponse> {
    var optionsXML = {
      compact: true,
      spaces: 4,
    };

    const xml_do_pedido = convert.js2xml({ pedido }, optionsXML);

    const url = `https://bling.com.br/Api/v2/pedido/json?apikey=${process.env.BLING_API_KEY}&xml=${xml_do_pedido}`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);
    const data: ICreateOrderResponse = await response.json();

    return data;
  }
}

export default BlingOrdersProvider;
