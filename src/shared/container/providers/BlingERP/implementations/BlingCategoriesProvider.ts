import convert from "xml-js";
import fetch from "node-fetch";

import ICreateCategory from "@shared/container/providers/BlingERP/dtos/ICreateCategory";
import {
  ICreateCategoryResponse,
  IGetCategoryResponse,
} from "@shared/container/providers/BlingERP/dtos/IBlingERPResponses";

import IBlingCategoriesProvider from "@shared/container/providers/BlingERP/models/IBlingCategoriesProvider";

class BlingCategoryProvider implements IBlingCategoriesProvider {
  constructor() {}

  public async get_category_id(id: number): Promise<ICreateCategoryResponse> {
    const url = `https://bling.com.br/Api/v2/categorias/${id}/json?apikey=${process.env.BLING_API_KEY}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);
    const data: ICreateCategoryResponse = await response.json();

    return data;
  }

  public async get(): Promise<IGetCategoryResponse> {
    const url = `https://bling.com.br/Api/v2/categorias/json?apikey=${process.env.BLING_API_KEY}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);
    const data: IGetCategoryResponse = await response.json();

    return data;
  }

  public async post(
    categoria: ICreateCategory,
  ): Promise<ICreateCategoryResponse> {
    var optionsXML = {
      compact: true,
      spaces: 4,
    };

    const xml = convert.js2xml({ categoria }, optionsXML);

    const url = `https://bling.com.br/Api/v2/categoria/json?apikey=${process.env.BLING_API_KEY}&xml=${xml}`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);
    const data: ICreateCategoryResponse = await response.json();

    return data;
  }
}

export default BlingCategoryProvider;
