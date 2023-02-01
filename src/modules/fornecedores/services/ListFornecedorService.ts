import { injectable, inject } from "tsyringe";

import IFornecedoresRepository from "@modules/fornecedores/repositories/IFornecedoresRepository";
import Fornecedores from "@modules/fornecedores/infra/typeorm/models/Fornecedores";

@injectable()
class ListFornecedorService {
  constructor(
    @inject("FornecedoresRepository")
    private fornecedoresRepository: IFornecedoresRepository
  ) {}

  public async execute(): Promise<Fornecedores[]> {
    return await this.fornecedoresRepository.list();
  }
}

export default ListFornecedorService;
