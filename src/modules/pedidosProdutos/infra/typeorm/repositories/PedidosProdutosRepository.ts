import { getRepository, Repository } from "typeorm";

import PedidoProduto from "@modules/pedidosProdutos/infra/typeorm/models/PedidosProdutos";
import ICreatePedidoProdutoDTO from "@modules/pedidosProdutos/dtos/ICreatePedidoProdutoDTO";
import IPedidosProdutosRepository from "@modules/pedidosProdutos/repositories/IPedidosProdutosRepository";
import {
  IResponse,
  IRequest,
} from "@modules/pedidosProdutos/dtos/IListAllPedidosProdutosDTO";

class OrdersProductsRepository implements IPedidosProdutosRepository {
  private ormRepository: Repository<PedidoProduto>;

  constructor() {
    this.ormRepository = getRepository(PedidoProduto);
  }

  public async listWithoutPagination(): Promise<PedidoProduto[]> {
    const all = await this.ormRepository.find();

    return all;
  }

  public async create(data: ICreatePedidoProdutoDTO): Promise<PedidoProduto> {
    const pedidoProduto = this.ormRepository.create(data);

    await this.ormRepository.save(pedidoProduto);

    return pedidoProduto;
  }

  public async findByID(id: string): Promise<PedidoProduto | undefined> {
    const findPedidoProduto = await this.ormRepository.findOne({
      where: { id },
    });

    return findPedidoProduto;
  }

  public async list({
    perPage,
    currentPage,
    compraFim,
    compraInicio,
    fornecedor,
    marca,
    pedidoId,
    produtoId,
    produtoNome,
    skuId,
    skuRef,
  }: IRequest): Promise<IResponse> {
    const countPedidosProdutos = await this.ormRepository.find();
    const perPageToShow =
      !perPage === true ? countPedidosProdutos.length : perPage;
    const page = !currentPage === true ? 1 : currentPage;
    const skip = perPageToShow * page - perPageToShow;

    const pedidosProdutosQuery = await this.ormRepository
      .createQueryBuilder("pedidosProdutos")
      .leftJoinAndSelect("pedidosProdutos.pedido_id_fk", "pedido_id_fk")
      .leftJoinAndSelect("pedidosProdutos.produto_id_fk", "produto_id_fk")
      .leftJoinAndSelect("produto_id_fk.fornecedor", "fornecedor")
      .leftJoinAndSelect("produto_id_fk.marca", "marca")
      .leftJoinAndSelect("pedidosProdutos.sku_id_fk", "sku_id_fk")
      .leftJoinAndSelect("sku_id_fk.var1fk", "var1fk")
      .leftJoinAndSelect("sku_id_fk.var2fk", "var2fk")
      .leftJoinAndSelect("pedidosProdutos.desconto_id_fk", "desconto_id_fk");

    if (compraFim) {
      pedidosProdutosQuery.andWhere(
        "pedidosProdutos.created_at  < :compraFim",
        {
          compraFim: `${new Date(compraFim).toUTCString()}`,
        },
      );
    }

    if (compraInicio) {
      pedidosProdutosQuery.andWhere(
        "pedidosProdutos.created_at  > :compraInicio",
        {
          compraInicio: `${new Date(compraInicio).toUTCString()}`,
        },
      );
    }

    if (skuRef) {
      pedidosProdutosQuery.andWhere("sku_id_fk.referencia  ilike :skuRef", {
        skuRef: `%${skuRef}%`,
      });
    }

    if (skuId) {
      pedidosProdutosQuery.andWhere("sku_id_fk.id  = :skuId", {
        skuId: `${skuId}`,
      });
    }

    if (produtoId) {
      pedidosProdutosQuery.andWhere("produto_id_fk.id  = :produtoId", {
        produtoId: `${produtoId}`,
      });
    }

    if (pedidoId) {
      pedidosProdutosQuery.andWhere("pedido_id_fk.id  = :pedidoId", {
        pedidoId: `${pedidoId}`,
      });
    }

    if (fornecedor) {
      pedidosProdutosQuery.andWhere("fornecedor.nome ilike :fornecedor", {
        fornecedor: `%${fornecedor}%`,
      });
    }

    if (produtoNome) {
      pedidosProdutosQuery.andWhere("produto_id_fk.nome ilike :produtoNome", {
        produtoNome: `%${produtoNome}%`,
      });
    }

    if (marca) {
      pedidosProdutosQuery.andWhere("marca.nome ilike :marca", {
        marca: `%${marca}%`,
      });
    }

    const pedidosProdutos = await pedidosProdutosQuery
      .take(perPageToShow)
      .skip(skip);

    const encontrados = await pedidosProdutos.getCount();

    const pag = {
      paginas:
        encontrados / perPageToShow < 1 ? 1 : encontrados / perPageToShow,
      atual: page,
      encontrados: encontrados,
      exibindo: perPageToShow,
    };

    return {
      pedidosProdutos: await pedidosProdutos.getMany(),
      pag,
    };
  }
}

export default OrdersProductsRepository;
