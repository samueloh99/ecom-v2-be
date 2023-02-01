import axios from "axios";
import convert from "xml-js";

import ICreateStock from "@shared/container/providers/BlingERP/dtos/ICreateStock";

import IBlingStockProvider from "@shared/container/providers/BlingERP/models/IBlingStockProvider";

class BlingStocksProvider implements IBlingStockProvider {
  constructor() {}

  public async get(): Promise<void> {
    const url = `https://bling.com.br/Api/v2/depositos/json?apikey=${process.env.BLING_API_KEY}`;

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

  public async post(deposito: ICreateStock): Promise<void> {
    var optionsXML = {
      compact: true,
      spaces: 4,
    };

    const xml = convert.js2xml({ deposito }, optionsXML);

    const url = `https://bling.com.br/Api/v2/deposito/json?apikey=${process.env.BLING_API_KEY}&xml=${xml}`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    return data;
  }
}

export default BlingStocksProvider;
