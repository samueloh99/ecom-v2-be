import { injectable, inject } from "tsyringe";

import ISkusRepository from "@modules/skus/repositories/ISkusRepository";
import AppError from "@shared/errors/AppError";

type IResponse = {
  foto1: string;
  foto2: string;
  foto3: string;
  foto4: string;
  foto5: string;
  foto6: string;
};

@injectable()
class ListSkuService {
  constructor(
    @inject("SkusRepository")
    private skusRepository: ISkusRepository,
  ) {}

  public async execute(): Promise<IResponse[]> {
    const all = await this.skusRepository.listWithoutPagination();

    if (!all) {
      throw new AppError("Skus não encontrados.");
    }

    const allPhotos = all.map(item => {
      return {
        foto1: item.foto1,
        foto2: item.foto2,
        foto3: item.foto3,
        foto4: item.foto4,
        foto5: item.foto5,
        foto6: item.foto6,
      };
    });

    return allPhotos;
  }
}

export default ListSkuService;
