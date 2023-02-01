export default interface ISQSOrderErrorProvider {
  post(client: string): Promise<void>;
}
