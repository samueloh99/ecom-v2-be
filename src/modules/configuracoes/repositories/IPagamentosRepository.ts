import Pagamento from "@modules/configuracoes/infra/typeorm/models/Pagamentos";
import ICreatePagamentoDTO from "@modules/configuracoes/dtos/ICreatePagamentoDTO";

export default interface IPagamentosRepository {
  create(data: ICreatePagamentoDTO): Promise<Pagamento>;
  list(): Promise<Pagamento[]>;
  delete(pagamento: Pagamento): Promise<Pagamento>;
  save(data: ICreatePagamentoDTO): Promise<Pagamento>;
  findById(id: number): Promise<Pagamento | undefined>;
}
