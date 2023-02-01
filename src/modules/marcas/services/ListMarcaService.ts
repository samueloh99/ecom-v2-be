import { injectable, inject } from "tsyringe";

import Marca from "@modules/marcas/infra/typeorm/models/Marcas";
import IMarcassRepository from "@modules/marcas/repositories/IMarcasRepository";

@injectable()
class ListMarcaService {
  constructor(
    @inject("MarcasRepository")
    private marcasRepository: IMarcassRepository
  ) {}

  public async execute(): Promise<Marca[]> {
    const all = this.marcasRepository.list();

    return all;
  }
}

export default ListMarcaService;
