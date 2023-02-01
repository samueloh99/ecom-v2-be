import { injectable, inject } from "tsyringe";

import Produto from "@modules/produtos/infra/typeorm/models/Produtos";

import IProdutosRepository from "@modules/produtos/repositories/IProdutosRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  nome: string;
  slug: string;
  referencia: string;
  ncm: string;
  marca_id: number;
  categoria_id: number;
  sub_categorias_ids: number[];
  fornecedor_id: number;
  comprimento: string;
  largura: string;
  altura: string;
  descricao: string;
  ativo: number;
  tipo_produto_id: number;
  tags: number[];
}

@injectable()
class CreateProdutoService {
  constructor(
    @inject("ProdutosRepository")
    private produtosRepository: IProdutosRepository,
  ) {}

  public async execute({
    nome,
    referencia,
    ncm,
    marca_id,
    categoria_id,
    fornecedor_id,
    comprimento,
    largura,
    altura,
    descricao,
    tipo_produto_id,
    ativo,
    tags,
    sub_categorias_ids,
  }: IRequest): Promise<Produto> {
    const findSameProdutoByName = await this.produtosRepository.findByName(
      nome,
    );

    if (findSameProdutoByName) {
      throw new AppError("Esse produto ja existe");
    }

    let slugFormated = nome.toLowerCase().replace(/\s/g, "-");

    const novoProduto = await this.produtosRepository.create({
      nome,
      slug: slugFormated,
      sub_categorias_ids,
      tags,
      referencia,
      ncm,
      marca_id,
      categoria_id,
      fornecedor_id,
      comprimento,
      largura,
      altura,
      tipo_produto_id,
      descricao,
      ativo,
    });

    return novoProduto;
  }
}

export default CreateProdutoService;
