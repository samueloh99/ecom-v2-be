import convert from "xml-js";
import fetch from "node-fetch";

import { ICreateProductResponse } from "@shared/container/providers/BlingERP/dtos/IBlingERPResponses";

import ICreateProduct from "@shared/container/providers/BlingERP/dtos/ICreateProduct";

import IBlingProductsProvider from "@shared/container/providers/BlingERP/models/IBlingProductsProvider";

class BlingProductsProvider implements IBlingProductsProvider {
  constructor() {}

  public async get(): Promise<void> {
    const url = `https://bling.com.br/Api/v2/produtos/json?apikey=${process.env.BLING_API_KEY}`;

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

  public async post(produto: ICreateProduct): Promise<ICreateProductResponse> {
    var optionsXML = {
      compact: true,
      spaces: 4,
    };

    const xml_do_produto = convert.js2xml({ produto }, optionsXML);

    const url = `https://bling.com.br/Api/v2/produto/json?apikey=${process.env.BLING_API_KEY}&xml=${xml_do_produto}`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);
    const data: ICreateProductResponse = await response.json();

    return data;
  }
}

export default BlingProductsProvider;
