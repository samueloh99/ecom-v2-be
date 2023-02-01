import { injectable, inject } from "tsyringe";

import { Readable } from "stream";

import readline from "readline";

import ISkusRepository from "@modules/skus/repositories/ISkusRepository";
import IProdutosRepository from "@modules/produtos/repositories/IProdutosRepository";
import IVariacoesRepository from "@modules/variacoes/repositories/IVariacoesRepository";
import AppError from "errors/AppError";

type IRequest = {
  file: Express.Multer.File | undefined;
};

// 0 NOME
// 1 REFERENCIA
// 2 SKU
// 3 COR
// 6 TAMANHO
// 4 NCM
// 5 CATEGORIA
// 7 ESTOQUE
// 8 PESO
// 9 CUSTO
// 10 VENDA
// 11 DESCRICAO

type SkusCSV = {
  nome: string;
  referencia: string;
  sku: string;
  cor: number;
  tamanho: number;
  ncm: string;
  categoria: number;
  estoque: number;
  peso: number;
  custo: number;
  venda: number;
  descricao: string;
};

@injectable()
class CreateSkuBulkService {
  constructor(
    @inject("SkusRepository")
    private skusRepository: ISkusRepository,

    @inject("ProdutosRepository")
    private produtosRepository: IProdutosRepository,

    @inject("VariacoesRepository")
    private variacoesRepository: IVariacoesRepository,
  ) {}

  public async execute({ file }: IRequest): Promise<void> {
    if (file) {
      const readableFile = new Readable();
      readableFile.push(file.buffer);
      readableFile.push(null);

      const skusLine = readline.createInterface({
        input: readableFile,
      });

      const skusBulk: SkusCSV[] = [];

      for await (let line of skusLine) {
        const separeteByComma = line.split(",");

        skusBulk.push({
          nome: separeteByComma[0],
          referencia: separeteByComma[1],
          sku: separeteByComma[2],
          cor: parseInt(separeteByComma[3]),
          tamanho: parseInt(separeteByComma[4]),
          ncm: separeteByComma[5],
          categoria: parseInt(separeteByComma[6]),
          estoque: parseInt(separeteByComma[7]),
          peso: parseInt(separeteByComma[8]),
          custo: parseFloat(separeteByComma[9]),
          venda: parseFloat(separeteByComma[10]),
          descricao: separeteByComma[11],
        });
      }

      let productsIdCreated: {
        referencia: string;
        id: number;
      }[] = [];

      Promise.all(
        skusBulk.map(async (item, index) => {
          const previousItem = skusBulk[index - 1];
          if (previousItem !== undefined) {
            if (item.referencia !== previousItem.referencia) {
              let slugFormated = item.nome.toLowerCase().replace(/\s/g, "-");

              const findSameProdutoByName =
                await this.produtosRepository.findByName(item.nome);

              if (findSameProdutoByName) {
                throw new AppError("Esse produto ja existe");
              }
              const newProduct = await this.produtosRepository.create({
                ativo: 1,
                nome: item.nome,
                descricao: item.descricao,
                slug: slugFormated,
                altura: "",
                comprimento: "",
                categoria_id: item.categoria,
                largura: "",
                ncm: item.ncm,
                referencia: item.referencia,
                tipo_produto_id: 1,
              });

              productsIdCreated.push({
                id: newProduct.id,
                referencia: newProduct.referencia,
              });
            }
          }
        }),
      )
        .then(() => {
          skusBulk.map(async (item, index) => {
            const findProductId = productsIdCreated.find(
              prod => prod.referencia === item.referencia,
            );

            if (findProductId) {
              const checkIfVariacao1IdExists =
                await this.variacoesRepository.findById(item.cor);

              const checkIfVariacao2IdExists =
                await this.variacoesRepository.findById(item.tamanho);

              if (!checkIfVariacao1IdExists || !checkIfVariacao2IdExists) {
                throw new AppError("Variacao não existe.", 406);
              }

              const checkIfSkuRefExists =
                await this.skusRepository.findSkuByRef(item.sku);

              if (checkIfSkuRefExists) {
                throw new AppError("Referência já existe.", 406);
              }

              const skuByProdutoId = await this.skusRepository.findByProdutoId(
                findProductId.id,
              );

              if (!skuByProdutoId) {
                throw new AppError(
                  "Nenhum SKU com esse produto id encontrado.",
                  406,
                );
              }

              skuByProdutoId.map(sku => {
                if (sku.var1_id === item.cor && sku.var2_id === item.tamanho) {
                  throw new AppError("Variação já existe", 406);
                }
              });
              await this.skusRepository.create({
                ativo: 1,
                estoque: item.estoque,
                gtin: "",
                mpn: "",
                peso: item.peso,
                preco_custo: item.custo,
                preco_venda: item.venda,
                produto_id: findProductId.id,
                referencia: item.sku,
                var1_id: item.cor,
                var2_id: item.tamanho,
              });
            }
          });
        })
        .catch(e => {
          return e;
        });
    }
  }
}

export default CreateSkuBulkService;
