import { getRepository, Repository } from "typeorm";

import ICreateMovimentacaoDTO from "@modules/movimentacoes/dtos/ICreateMovimentacaoDTO";
import ICreateMovimentacaoBulkDTO from "@modules/movimentacoes/dtos/ICreateMovimentacaoBulkDTO";
import {
  IRequest,
  IResponse,
} from "@modules/movimentacoes/dtos/IListMovimentacaoDTO";
import IMovimentacoesRepository from "@modules/movimentacoes/repositories/IMovimentacoesRepository";

import Movimentacoes from "@modules/movimentacoes/infra/typeorm/models/Movimentacoes";
import Skus from "@modules/skus/infra/typeorm/models/Skus";
import AppError from "@shared/errors/AppError";

class MovimentacoesRepository implements IMovimentacoesRepository {
  private ormRepository: Repository<Movimentacoes>;
  private skuRepository: Repository<Skus>;

  constructor() {
    this.ormRepository = getRepository(Movimentacoes);
    this.skuRepository = getRepository(Skus);
  }

  public async listWithoutPagination(): Promise<Movimentacoes[]> {
    const all = await this.ormRepository.find();

    return all;
  }

  public async findBySkusAndRemoveStocks(
    data: ICreateMovimentacaoBulkDTO[],
  ): Promise<Skus[]> {
    const skus = data.map(item => item.code);
    const findSkus = await this.skuRepository.findByIds(skus);

    data.map(async item => {
      const sku = findSkus.find(sku => String(sku.id) === item.code);
      if (sku) {
        sku.estoque -= item.quantity;
        await this.skuRepository.save(sku);
      }
    });

    return findSkus;
  }

  public async findBySku(sku_id: number): Promise<Skus | undefined> {
    const findSku = await this.skuRepository.findOne(sku_id);

    return findSku;
  }

  public async findBySkuAndRemoveStock({
    quantidade,
    sku_id,
  }: ICreateMovimentacaoDTO): Promise<Skus> {
    const findBySkuAndChange = await this.skuRepository.findOne({
      where: { id: sku_id },
    });

    if (findBySkuAndChange) {
      findBySkuAndChange.estoque -= quantidade;
      await this.skuRepository.save(findBySkuAndChange);
    } else {
      throw new AppError("SKU Não encontrado.");
    }

    return findBySkuAndChange;
  }

  public async findBySkuAndAddStock({
    quantidade,
    sku_id,
  }: ICreateMovimentacaoDTO): Promise<Skus> {
    const findBySkuAndChange = await this.skuRepository.findOne({
      where: { id: sku_id },
    });

    if (findBySkuAndChange) {
      findBySkuAndChange.estoque += quantidade;
      await this.skuRepository.save(findBySkuAndChange);
    } else {
      throw new AppError("SKU Não encontrado.");
    }

    return findBySkuAndChange;
  }

  public async findBySkuAndBalanceStock(
    data: ICreateMovimentacaoDTO,
  ): Promise<Skus> {
    const findBySkuAndChange = await this.skuRepository.save({
      id: data.sku_id,
      estoque: data.quantidade,
    });

    return findBySkuAndChange;
  }

  public async create(data: ICreateMovimentacaoDTO): Promise<Movimentacoes> {
    const movimentacao = this.ormRepository.create(data);

    await this.ormRepository.save(movimentacao);

    return movimentacao;
  }

  public async list({ currentPage, perPage }: IRequest): Promise<IResponse> {
    const countSkus = await this.ormRepository.find();

    const perPageToShow = !perPage === true ? countSkus.length : perPage;
    const page = !currentPage === true ? 1 : currentPage;
    const skip = perPageToShow * page - perPageToShow;

    const movimentacoesQuery = await this.ormRepository
      .createQueryBuilder("movimentacoes")
      .leftJoinAndSelect(
        "movimentacoes.sku_id_movimentacoes",
        "sku_id_movimentacoes",
      );

    const movimentacoes = await movimentacoesQuery
      .take(perPageToShow)
      .skip(skip);

    const encontrados = await movimentacoes.getCount();

    const pag = {
      paginas:
        encontrados / perPageToShow < 1 ? 1 : encontrados / perPageToShow,
      atual: page,
      encontrados: encontrados,
      exibindo: perPageToShow,
    };

    return {
      movimentacoes: await movimentacoes.getMany(),
      pag,
    };
  }
}

export default MovimentacoesRepository;
