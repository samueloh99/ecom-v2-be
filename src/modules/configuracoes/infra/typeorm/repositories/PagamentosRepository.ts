import { getRepository, Repository } from "typeorm";

import ICreatePagamentoDTO from "@modules/configuracoes/dtos/ICreatePagamentoDTO";
import IPagamentosRepository from "@modules/configuracoes/repositories/IPagamentosRepository";
import Pagamento from "@modules/configuracoes/infra/typeorm/models/Pagamentos";

class PagamentosRepository implements IPagamentosRepository {
  private ormRepository: Repository<Pagamento>;

  constructor() {
    this.ormRepository = getRepository(Pagamento);
  }
  public async create(data: ICreatePagamentoDTO): Promise<Pagamento> {
    const deposito = this.ormRepository.create(data);

    await this.ormRepository.save(deposito);

    return deposito;
  }
  public async list(): Promise<Pagamento[]> {
    return await this.ormRepository.find();
  }
  public async delete(pagamento: Pagamento): Promise<Pagamento> {
    return await this.ormRepository.remove(pagamento);
  }
  public async save(data: ICreatePagamentoDTO): Promise<Pagamento> {
    return await this.ormRepository.save(data);
  }
  public async findById(id: number): Promise<Pagamento | undefined> {
    return await this.ormRepository.findOne({ where: { id } });
  }
}

export default PagamentosRepository;
