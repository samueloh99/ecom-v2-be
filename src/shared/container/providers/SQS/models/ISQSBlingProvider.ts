import ICreateSQSBling from "@shared/container/providers/SQS/dtos/ICreateSQSBling";

export default interface ISQSBlingProvider {
  post(client: ICreateSQSBling): Promise<void>;
  get(): Promise<string>;
}
