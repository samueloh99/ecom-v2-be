import { PrecoPrazoResponse } from "correios-brasil";

import IFreteProduto from "@shared/container/providers/Correios/dtos/IFreteProduto";

export default interface ICorreiosPacProvider {
  calcFretePac(data: IFreteProduto): Promise<PrecoPrazoResponse>;
}
