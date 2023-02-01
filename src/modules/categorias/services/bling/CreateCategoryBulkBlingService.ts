import { injectable, inject } from "tsyringe";

import IBlingCategoriesProvider from "@shared/container/providers/BlingERP/models/IBlingCategoriesProvider";
import ICategoriasRepository from "@modules/categorias/repositories/ICategoriasRepository";

type IResponseCategoriesAdded = {
  nome: string;
  added: boolean;
};

@injectable()
class CreateCategoryBlingService {
  constructor(
    @inject("BlingCategoriesProvider")
    private blingCategoriesProvider: IBlingCategoriesProvider,

    @inject("CategoriasRepository")
    private categoriasRepository: ICategoriasRepository,
  ) {}

  public async execute(): Promise<IResponseCategoriesAdded[]> {
    const categorias = await this.categoriasRepository.list();

    const newMap = categorias.map(item => {
      return {
        descricao: item.nome,
        idCategoriaPai: item.pai_id,
      };
    });
    let categoriesAdded: IResponseCategoriesAdded[] = [];

    await Promise.all(
      newMap.map(async item => {
        setTimeout(async () => {
          await this.blingCategoriesProvider
            .post(item)
            .then(res => {
              if (!res.retorno.categorias) {
                return categoriesAdded.push({
                  nome: item.descricao,
                  added: false,
                });
              }
              categoriesAdded.push({ nome: item.descricao, added: true });
            })
            .catch(err => console.log("aq", err));
        }, 5000);
      }),
    );

    return categoriesAdded;
  }
}

export default CreateCategoryBlingService;
