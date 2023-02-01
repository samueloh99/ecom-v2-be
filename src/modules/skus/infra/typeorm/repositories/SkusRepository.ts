import ISkusRepository from "@modules/skus/repositories/ISkusRepository";

import { getRepository, Repository, DeleteResult, In } from "typeorm";

import Skus from "@modules/skus/infra/typeorm/models/Skus";
import ICreateSkuDTO from "@modules/skus/dtos/ICreateSkuDTO";
import { IRequest, IResponse } from "@modules/skus/dtos/IListSkusDTO";

class SkusRepository implements ISkusRepository {
  private ormRepository: Repository<Skus>;

  constructor() {
    this.ormRepository = getRepository(Skus);
  }

  public async updatePhotoSku(
    sku_id: number,
    foto: string,
    index: string,
  ): Promise<void> {
    if (index === "1") {
      await this.ormRepository.update(
        {
          id: sku_id,
        },
        { foto1: foto },
      );
    }
    if (index === "2") {
      await this.ormRepository.update(
        {
          id: sku_id,
        },
        { foto2: foto },
      );
    }
    if (index === "3") {
      await this.ormRepository.update(
        {
          id: sku_id,
        },
        { foto3: foto },
      );
    }
    if (index === "4") {
      await this.ormRepository.update(
        {
          id: sku_id,
        },
        { foto4: foto },
      );
    }
    if (index === "5") {
      await this.ormRepository.update(
        {
          id: sku_id,
        },
        { foto5: foto },
      );
    }
    if (index === "6") {
      await this.ormRepository.update(
        {
          id: sku_id,
        },
        { foto6: foto },
      );
    }
  }

  public async listWithoutPagination(): Promise<Skus[]> {
    const all = await this.ormRepository.find({
      relations: ["var1fk", "var2fk", "produto", "produto.categoria"],
    });

    return all;
  }

  public async findSkuByProductRef(
    produto_referencia: string,
  ): Promise<Skus[]> {
    const findSkuByProductRef = await this.ormRepository.find({
      relations: ["produto", "var1fk", "var2fk"],
      where: {
        produto: {
          referencia: produto_referencia,
        },
      },
    });

    return findSkuByProductRef;
  }

  public async filterSkuByVar1(
    variacoes: number[],
    id: number,
  ): Promise<Skus[]> {
    const filterByVar1 = await this.ormRepository.createQueryBuilder("skus");

    filterByVar1
      .leftJoinAndSelect("skus.produto", "produto")
      .innerJoinAndSelect("skus.var1fk", "var1fk")
      .where("produto.categoria_id = :id", { id })
      .where("var1fk.id IN (:...id)", { id: variacoes })
      .getMany();

    const filter = await filterByVar1.getMany();

    return filter;
  }

  public async filterSkuByQuery(
    variacoes: number[],
    id: string,
  ): Promise<Skus[]> {
    const skuFilter = await this.ormRepository.createQueryBuilder("skus");
    if (variacoes.length > 1) {
      skuFilter
        .leftJoinAndSelect("skus.produto", "produto")
        .innerJoinAndSelect("skus.var1fk", "var1fk")
        .innerJoinAndSelect("skus.var2fk", "var2fk")
        .where("produto.categoria_id = :id", { id: parseInt(id) })
        .where("var1fk.id IN (:...id)", { id: variacoes })
        .orWhere("var2fk.id IN (:...id)", { id: variacoes })
        .getMany();
    } else {
      skuFilter
        .leftJoinAndSelect("skus.produto", "produto")
        .innerJoinAndSelect("skus.var1fk", "var1fk")
        .innerJoinAndSelect("skus.var2fk", "var2fk")
        .where("produto.categoria_id = :id", { id: parseInt(id) })
        .where("var1fk.id = :id", { id: variacoes[0] })
        .orWhere("var2fk.id = :id", { id: variacoes[0] })
        .getMany();
    }

    const filter = await skuFilter.getMany();

    return filter;
  }

  public async findSkusBySkuList(skus: string[]): Promise<Skus[]> {
    const skuList = await this.ormRepository.findByIds(skus, {
      relations: ["var1fk", "var2fk", "produto"],
    });

    return skuList;
  }

  public async findSkuByRef(referencia: string): Promise<Skus | undefined> {
    const findSkuByName = await this.ormRepository.findOne({
      where: { referencia },
    });

    return findSkuByName;
  }

  public async findSkuRelatedByProdutoId(
    id: number,
  ): Promise<Skus[] | undefined> {
    const skusRelated = await this.ormRepository
      .createQueryBuilder("skus")
      .innerJoinAndSelect("skus.var1fk", "var1fk")
      .innerJoinAndSelect("skus.var2fk", "var2fk")
      .where("skus.produto_id = :id", { id })
      .getMany();

    return skusRelated;
  }

  public async findSkuProdutoByCatId(id: number): Promise<Skus[] | undefined> {
    const skusProducts = await this.ormRepository
      .createQueryBuilder("skus")
      .innerJoinAndSelect(
        "skus.produto",
        "produto",
        "produto.categoria_id = :id",
        { id },
      )
      .innerJoinAndSelect("skus.var1fk", "var1fk")
      .innerJoinAndSelect("skus.var2fk", "var2fk")
      .getMany();

    const skus = await this.ormRepository
      .createQueryBuilder("skus")
      .innerJoinAndSelect("skus.produto", "produto")
      .innerJoinAndSelect("skus.var1fk", "var1fk")
      .innerJoinAndSelect("skus.var2fk", "var2fk")
      .getMany();

    const filterSkuBySubCategories = skus
      .filter(item => item.ativo === 1)
      .filter(
        item =>
          item.produto.sub_categorias_ids &&
          item.produto.sub_categorias_ids.includes(id),
      );

    const concatAll = [
      ...filterSkuBySubCategories,
      ...skusProducts.filter(item => item.ativo === 1),
    ];

    return concatAll;
  }

  public async deleteSkuById(id: number): Promise<DeleteResult> {
    const findSkuAndDelete = await this.ormRepository
      .createQueryBuilder()
      .delete()
      .where("id = :id", { id })
      .execute();

    return findSkuAndDelete;
  }

  public async findByProdutoId(
    produto_id: number,
  ): Promise<Skus[] | undefined> {
    const findAllByProductId = await this.ormRepository.find({
      where: { produto_id },
      relations: ["var1fk", "var2fk", "produto"],
    });

    return findAllByProductId;
  }

  public async findSkuById(id: number): Promise<Skus | undefined> {
    const findSkuById = await this.ormRepository.findOne({
      where: { id },
      relations: ["var1fk", "var2fk", "produto"],
    });

    return findSkuById;
  }

  public async create(data: ICreateSkuDTO): Promise<Skus> {
    const sku = this.ormRepository.create(data);

    await this.ormRepository.save(sku);

    return sku;
  }

  public async list({
    ativos,
    categoria,
    currentPage,
    estoque,
    estoqueOp,
    inativos,
    perPage,
    precoVenda,
    precoVendaOp,
    produtoCodigo,
    produtoMarca,
    produtoNome,
    produtoReferencia,
    skuCodigo,
    skuReferencia,
  }: IRequest): Promise<IResponse> {
    const perPageToShow = !perPage === true ? 20 : perPage;
    const page = !currentPage === true ? 1 : currentPage;
    const skip = perPageToShow * page - perPageToShow;

    const skusQuery = await this.ormRepository
      .createQueryBuilder("skus")
      .leftJoinAndSelect("skus.var1fk", "var1fk")
      .leftJoinAndSelect("skus.var2fk", "var2fk")
      .leftJoinAndSelect("skus.produto", "produto")
      .leftJoinAndSelect("produto.categoria", "categoria")
      .leftJoinAndSelect("produto.marca", "marca");

    // 0 = IGUAL
    if (estoqueOp === "0") {
      skusQuery.andWhere("skus.estoque = :estoque", {
        estoque: `${estoque}`,
      });
    }

    // 1 = MAIOR IGUAL
    if (estoqueOp === "1") {
      skusQuery.andWhere("skus.estoque >= :estoque", {
        estoque: `${estoque}`,
      });
    }

    // 2 = MENOR IGUAL
    if (estoqueOp === "2") {
      skusQuery.andWhere("skus.estoque <= :estoque", {
        estoque: `${estoque}`,
      });
    }

    // 0 = IGUAL
    if (precoVendaOp === "0") {
      skusQuery.andWhere("skus.preco_venda = :precoVenda", {
        precoVenda: `${precoVenda}`,
      });
    }

    // 1 = MAIOR IGUAL
    if (precoVendaOp === "1") {
      skusQuery.andWhere("skus.preco_venda >= :precoVenda", {
        precoVenda: `${precoVenda}`,
      });
    }

    // 2 = MENOR IGUAL
    if (precoVendaOp === "2") {
      skusQuery.andWhere("skus.preco_venda <= :precoVenda", {
        precoVenda: `${precoVenda}`,
      });
    }

    if (categoria) {
      skusQuery.andWhere("produto.categoria.nome ilike :categoria", {
        categoria: `%${categoria}%`,
      });
    }

    if (produtoReferencia) {
      skusQuery.andWhere("produto.referencia ilike :produtoReferencia", {
        produtoReferencia: `%${produtoReferencia}%`,
      });
    }

    if (produtoNome) {
      skusQuery.andWhere("produto.nome ilike :produtoNome", {
        produtoNome: `%${produtoNome}%`,
      });
    }

    if (produtoMarca) {
      skusQuery.andWhere("marca.nome  ilike :produtoMarca", {
        produtoMarca: `%${produtoMarca}%`,
      });
    }

    if (produtoCodigo) {
      skusQuery.andWhere("produto.id  = :produtoCodigo", {
        produtoCodigo: `${produtoCodigo}`,
      });
    }

    if (inativos) {
      skusQuery.andWhere("skus.ativo = 0");
    }

    if (ativos) {
      skusQuery.andWhere("skus.ativo = 1");
    }

    if (skuCodigo) {
      skusQuery.andWhere("skus.id  = :skuCodigo", {
        skuCodigo: `${skuCodigo}`,
      });
    }

    if (skuReferencia) {
      skusQuery.andWhere("skus.referencia  ilike :skuReferencia", {
        skuReferencia: `%${skuReferencia}%`,
      });
    }

    const skus = await skusQuery.take(perPageToShow).skip(skip);

    const encontrados = await skus.getCount();

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
      skus: await skus.getMany(),
      pag,
    };
  }

  public async save(sku: Skus): Promise<Skus> {
    return await this.ormRepository.save(sku);
  }

  public async filterByArrayProdRef(referencia: string[]): Promise<Skus[]> {
    const skus = await this.ormRepository.find({
      relations: ["produto", "var1fk", "var2fk"],
      where: {
        produto: {
          referencia: In(referencia),
        },
      },
    });

    return skus;
  }
}

export default SkusRepository;
