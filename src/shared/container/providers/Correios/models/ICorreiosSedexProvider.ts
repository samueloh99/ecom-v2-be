import { PrecoPrazoResponse } from "correios-brasil";

import IFreteProduto from "@shared/container/providers/Correios/dtos/IFreteProduto";

export default interface ICorreiosSedexProvider {
  calcFreteSedex(data: IFreteProduto): Promise<PrecoPrazoResponse>;
}
