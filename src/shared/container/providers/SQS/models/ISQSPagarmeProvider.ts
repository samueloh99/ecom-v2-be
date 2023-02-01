import ICreateSQSPagarme from "@shared/container/providers/SQS/dtos/ICreateSQSPagarme";

export default interface ISQSPagarmeProvider {
  post(client: ICreateSQSPagarme): Promise<void>;
}
