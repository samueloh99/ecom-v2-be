import { injectable, inject } from "tsyringe";

import IResponsePagarmeWebhookOrder from "@modules/checkout/dtos/IResponsePagarmeWebhookOrder";

import ISQSPagarmeProvider from "@shared/container/providers/SQS/models/ISQSPagarmeProvider";
@injectable()
class CreateWebhookPagarmeService {
  constructor(
    @inject("SQSPagarmeProvider")
    private sqsPagarmeProvider: ISQSPagarmeProvider,
  ) {}

  public async execute({
    account,
    created_at,
    data,
    id,
    type,
  }: IResponsePagarmeWebhookOrder): Promise<void> {
    const newObj = {
      account,
      created_at,
      data,
      id,
      type,
    };
    const stringfyCharge = JSON.stringify(newObj);

    await this.sqsPagarmeProvider.post({
      mensagem: stringfyCharge,
    });
  }
}

export default CreateWebhookPagarmeService;
