import { DeleteResult, getRepository, In, Repository } from "typeorm";

import ICreateProdutoDTO from "@modules/produtos/dtos/ICreateProdutoDTO";
import { IRequest, IResponse } from "@modules/produtos/dtos/IListProductsDTO";
import IProdutosRepository from "@modules/produtos/repositories/IProdutosRepository";

import Produto from "@modules/produtos/infra/typeorm/models/Produtos";

class ProdutosRepository implements IProdutosRepository {
  private ormRepository: Repository<Produto>;

  constructor() {
    this.ormRepository = getRepository(Produto);
  }

  public async listWithoutPagination(): Promise<Produto[]> {
    const all = await this.ormRepository.find({
      relations: ["marca", "fornecedor", "categoria"],
    });

    return all;
  }

  public async save(data: Produto): Promise<Produto> {
    return await this.ormRepository.save(data);
  }

  public async deleteProdutoById(id: number): Promise<DeleteResult> {
    const findProdutoAndDelete = await this.ormRepository
      .createQueryBuilder()
      .delete()
      .where("id = :id", { id })
      .execute();

    return findProdutoAndDelete;
  }

  public async findProdutoById(id: number): Promise<Produto | undefined> {
    const produto = await this.ormRepository.findOne({
      where: { id },
      relations: ["marca", "fornecedor", "categoria"],
    });

    return produto;
  }

  public async create(data: ICreateProdutoDTO): Promise<Produto> {
    const produto = this.ormRepository.create(data);

    await this.ormRepository.save(produto);

    return produto;
  }

  public async findByName(nome: string): Promise<Produto | undefined> {
    const findProduto = await this.ormRepository.findOne({
      where: { nome },
    });

    return findProduto;
  }

  public async list({
    currentPage,
    perPage,
    ativos,
    cadastroFim,
    cadastroInicio,
    categorias,
    codigo,
    fornecedor,
    inativos,
    marca,
    ncm,
    nome,
    referencia,
  }: IRequest): Promise<IResponse> {
    const perPageToShow = !perPage === true ? 20 : perPage;
    const page = !currentPage === true ? 1 : currentPage;
    const skip = perPageToShow * page - perPageToShow;

    const productsQuery = await this.ormRepository
      .createQueryBuilder("produtos")
      .leftJoinAndSelect("produtos.marca", "marca")
      .leftJoinAndSelect("produtos.fornecedor", "fornecedor")
      .leftJoinAndSelect("produtos.categoria", "categoria");

    if (categorias) {
      productsQuery.andWhere("categoria.nome ilike :categorias", {
        categorias: `%${categorias}%`,
      });
    }

    if (referencia) {
      productsQuery.andWhere("produtos.referencia ilike :referencia", {
        referencia: `%${referencia}%`,
      });
    }

    if (ncm) {
      productsQuery.andWhere("produtos.ncm ilike :ncm", {
        ncm: `%${ncm}%`,
      });
    }

    if (nome) {
      productsQuery.andWhere("produtos.nome ilike :nome", {
        nome: `%${nome}%`,
      });
    }

    if (marca) {
      productsQuery.andWhere("marca.nome  ilike :marca", {
        marca: `%${marca}%`,
      });
    }

    if (fornecedor) {
      productsQuery.andWhere("fornecedor.nome  ilike :fornecedor", {
        fornecedor: `%${fornecedor}%`,
      });
    }

    if (inativos) {
      productsQuery.andWhere("produtos.ativo = 0");
    }

    if (ativos) {
      productsQuery.andWhere("produtos.ativo = 1");
    }

    if (codigo) {
      productsQuery.andWhere("produtos.id  = :codigo", {
        codigo: `${codigo}`,
      });
    }

    if (cadastroFim) {
      productsQuery.andWhere("produtos.created_at  < :cadastroFim", {
        cadastroFim: `${new Date(cadastroFim).toUTCString()}`,
      });
    }

    if (cadastroInicio) {
      productsQuery.andWhere("produtos.created_at  > :cadastroInicio", {
        cadastroInicio: `${new Date(cadastroInicio).toUTCString()}`,
      });
    }

    const products = await productsQuery.take(perPageToShow).skip(skip);

    const encontrados = await products.getCount();

    const pag = {
      paginas:
        encontrados / perPageToShow < 1
          ? 1
          : Math.ceil(encontrados / perPageToShow),
      atual: page,
      encontrados: encontrados,
      exibindo: perPageToShow,
    };

    return {
      produtos: await products.getMany(),
      pag,
    };
  }

  public async findProdutoByCatId(id: number): Promise<Produto[] | undefined> {
    const products = await this.ormRepository.find({
      relations: ["marca", "fornecedor", "categoria"],
      where: { categoria_id: id, ativo: 1 },
    });

    const productsList = await this.ormRepository.find({
      relations: ["marca", "fornecedor", "categoria"],
      where: { ativo: 1 },
    });

    const filterSkuBySubCategories = productsList.filter(
      item => item.sub_categorias_ids && item.sub_categorias_ids.includes(id),
    );

    const concatAll = [...filterSkuBySubCategories, ...products];

    return concatAll;
  }

  public async filterByArrayProdRef(referencias: string[]): Promise<Produto[]> {
    const produtos = await this.ormRepository.find({
      relations: ["marca", "fornecedor", "categoria"],
      where: {
        referencia: In(referencias),
      },
    });

    return produtos;
  }

  public async findProductByRef(
    referencia: string,
  ): Promise<Produto | undefined> {
    const produtos = await this.ormRepository.findOne({
      relations: ["marca", "fornecedor", "categoria"],
      where: {
        referencia: referencia,
      },
    });

    return produtos;
  }
}

export default ProdutosRepository;
