import { getRepository, Repository } from "typeorm";

import ICreatePedidoDTO from "@modules/pedidos/dtos/ICreatePedidoDTO";

import {
  IListAllPedidosDTO,
  IRequest,
} from "@modules/pedidos/dtos/IListAllPedidosDTO";

import IPedidosRepository from "@modules/pedidos/repositories/IPedidosRepository";

import Pedido from "../models/Pedidos";

class PedidosRepository implements IPedidosRepository {
  private ormRepository: Repository<Pedido>;

  constructor() {
    this.ormRepository = getRepository(Pedido);
  }

  public async save(pedido: Pedido): Promise<Pedido> {
    return await this.ormRepository.save(pedido);
  }

  public async listWithoutPagination(): Promise<Pedido[]> {
    const all = await this.ormRepository.find();

    return all;
  }

  public async findByUserId(id: number): Promise<Pedido[]> {
    const findByUserId = await this.ormRepository.find({
      where: { usuario_id: id },
    });

    return findByUserId;
  }

  public async create(data: ICreatePedidoDTO): Promise<Pedido> {
    const pedido = this.ormRepository.create(data);

    await this.ormRepository.save(pedido);

    return pedido;
  }

  public async list({
    currentPage,
    perPage,
    clienteEmail,
    clienteNome,
    clienteId,
    clienteGenero,
    cep,
    estado,
    pedidoId,
    temDesconto,
  }: IRequest): Promise<IListAllPedidosDTO> {
    const countPedidos = await this.ormRepository.find();

    const perPageToShow = !perPage === true ? countPedidos.length : perPage;
    const page = !currentPage === true ? 1 : currentPage;
    const skip = perPageToShow * page - perPageToShow;

    const pedidosQuery = await this.ormRepository
      .createQueryBuilder("pedidos")
      .leftJoinAndSelect("pedidos.usuario", "usuario")
      .leftJoinAndSelect("pedidos.enderecoFk", "enderecoFk")
      .leftJoinAndSelect("pedidos.cupom_id_fk", "cupom_id_fk");

    if (temDesconto) {
      temDesconto === "Sim" &&
        pedidosQuery.andWhere("pedidos.cupom_id_fk is not NULL");
      temDesconto === "Nao" &&
        pedidosQuery.andWhere("pedidos.cupom_id_fk is NULL");
    }

    if (pedidoId) {
      pedidosQuery.andWhere("pedidos.id = :pedidoId", {
        pedidoId: `${pedidoId}`,
      });
    }

    if (estado) {
      pedidosQuery.andWhere("enderecoFk.estado ilike :estado", {
        estado: `%${estado}%`,
      });
    }

    if (cep) {
      pedidosQuery.andWhere("enderecoFk.cep ilike :cep", {
        cep: `%${cep}%`,
      });
    }

    if (clienteEmail) {
      pedidosQuery.andWhere("usuario.email ilike :email", {
        email: `%${clienteEmail}%`,
      });
    }

    if (clienteNome) {
      pedidosQuery.andWhere("usuario.nome_completo ilike :nome_completo", {
        nome_completo: `%${clienteNome}%`,
      });
    }

    if (clienteId) {
      pedidosQuery.andWhere("pedidos.usuario_id = :clienteId", {
        clienteId: `${clienteId}`,
      });
    }

    if (clienteGenero) {
      clienteGenero === "F" &&
        pedidosQuery.andWhere("usuario.genero like :clienteGenero", {
          clienteGenero: "Feminino",
        });

      clienteGenero === "M" &&
        pedidosQuery.andWhere("usuario.genero like :clienteGenero", {
          clienteGenero: "Masculino",
        });
    }

    const pedidos = await pedidosQuery
      .orderBy("pedidos.created_at", "DESC")
      .take(perPageToShow)
      .skip(skip);

    const encontrados = await pedidos.getCount();

    const pag = {
      paginas:
        encontrados / perPageToShow < 1 ? 1 : encontrados / perPageToShow,
      atual: page,
      encontrados: encontrados,
      exibindo: perPageToShow,
    };

    return {
      pedidos: await pedidos.getMany(),
      pag,
    };
  }

  public async findById(id: number): Promise<Pedido | undefined> {
    const findPedido = await this.ormRepository.findOne({
      where: { id: id },
      relations: ["usuario", "enderecoFk", "cupom_id_fk"],
    });

    return findPedido;
  }
}

export default PedidosRepository;
