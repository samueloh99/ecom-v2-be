import { injectable } from "tsyringe";

import fetch from "node-fetch";
import IListPagarmeWebhook from "@modules/checkout/dtos/IListPagarmeWebhooks";

@injectable()
class ListWebhookPagarmeService {
  constructor() {}

  public async execute(): Promise<void> {
    try {
      const url = `https://api.pagar.me/core/v5/hooks`;
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

      const data: IListPagarmeWebhook = await response.json();

      console.log(data.data.map(item => item.data));
    } catch (err) {
      console.log(err);
    }
  }
}

export default ListWebhookPagarmeService;
