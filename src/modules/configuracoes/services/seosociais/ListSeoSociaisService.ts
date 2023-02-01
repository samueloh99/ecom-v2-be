import { injectable, inject } from "tsyringe";

import ISeoSociaisRepository from "@modules/configuracoes/repositories/ISeoSociaisRepository";
import SeoSociais from "@modules/configuracoes/infra/typeorm/models/SeoSociais";

@injectable()
class ListSeoSociaisService {
  constructor(
    @inject("SeoSociaisRepository")
    private seoSociaisRepository: ISeoSociaisRepository,
  ) {}
  public async execute(): Promise<SeoSociais[]> {
    return await this.seoSociaisRepository.list();
  }
}

export default ListSeoSociaisService;
