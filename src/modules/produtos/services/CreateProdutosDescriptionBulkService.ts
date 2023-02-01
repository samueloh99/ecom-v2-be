import { injectable, inject } from "tsyringe";

import fs from "fs";

import csv from "csv-parser";

import IProdutosRepository from "@modules/produtos/repositories/IProdutosRepository";

type IRequest = {
  file: Express.Multer.File | undefined;
};

type SkusCSV = {
  nome: string;
  REFERENCIA: string;
  sku: string;
  cor: number;
  tamanho: number;
  ncm: string;
  categoria: number;
  estoque: number;
  peso: number;
  custo: number;
  venda: number;
  DESCRICAO: string;
};

@injectable()
class CreateProdutosDescriptionBulkService {
  constructor(
    @inject("ProdutosRepository")
    private produtosRepository: IProdutosRepository,
  ) {}

  public async execute({ file }: IRequest): Promise<void> {
    if (file) {
      const response: SkusCSV[] = [];

      fs.createReadStream(file.path)
        .pipe(csv())
        .on("data", data => response.push(data))
        .on("end", () => {
          const uniqueRefs = Array.from(
            new Set(response.map(item => item.REFERENCIA)),
          ).map(item => {
            const findRef = response.find(ref => ref.REFERENCIA === item);

            return {
              referencia: item,
              descricao: findRef ? findRef.DESCRICAO : "",
            };
          });

          Promise.all(
            uniqueRefs.map(async item => {
              const findProductByRef =
                await this.produtosRepository.findProductByRef(item.referencia);
              if (findProductByRef) {
                findProductByRef.descricao = item.descricao;
                await this.produtosRepository.save(findProductByRef);
              } else {
                console.log("NAO ACHOU");
              }
            }),
          );
        });
    }
  }
}

export default CreateProdutosDescriptionBulkService;
