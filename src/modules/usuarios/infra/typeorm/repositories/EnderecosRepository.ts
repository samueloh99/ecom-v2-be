import { getRepository, Repository } from "typeorm";

import IEnderecosRepository from "@modules/usuarios/repositories/IEnderecosRepository";

import Enderecos from "@modules/usuarios/infra/typeorm/models/Enderecos";
import ICreateEnderecosDTO from "@modules/usuarios/dtos/ICreateEnderecosDTO";
import { IRequest, IResponse } from "@modules/usuarios/dtos/IListEnderecosDTO";

class EnderecosRepository implements IEnderecosRepository {
  private ormRepository: Repository<Enderecos>;

  constructor() {
    this.ormRepository = getRepository(Enderecos);
  }

  public async listWithoutPagination(): Promise<Enderecos[]> {
    const all = await this.ormRepository.find();

    return all;
  }

  public async delete(endereco: Enderecos): Promise<Enderecos> {
    return await this.ormRepository.remove(endereco);
  }

  public async list({
    currentPage,
    perPage,
    bairro,
    cadastroFim,
    cadastroInicio,
    cep,
    cidade,
    destinatario,
    endereco,
    estado,
    numero,
    pais,
    usuarioId,
  }: IRequest): Promise<IResponse> {
    const countEnderecos = await this.ormRepository.find();
    const perPageToShow = !perPage === true ? countEnderecos.length : perPage;
    const page = !currentPage === true ? 1 : currentPage;
    const skip = perPageToShow * page - perPageToShow;

    const addressQuery = await this.ormRepository
      .createQueryBuilder("enderecos")
      .leftJoinAndSelect("enderecos.usuario_id_fk", "usuario_id_fk");

    if (numero) {
      addressQuery.andWhere("enderecos.numero ilike :numero", {
        numero: `%${numero}%`,
      });
    }

    if (pais) {
      addressQuery.andWhere("enderecos.pais ilike :pais", {
        pais: `%${pais}%`,
      });
    }

    if (bairro) {
      addressQuery.andWhere("enderecos.bairro ilike :bairro", {
        bairro: `%${bairro}%`,
      });
    }

    if (cep) {
      addressQuery.andWhere("enderecos.cep ilike :cep", {
        cep: `%${cep}%`,
      });
    }

    if (cidade) {
      addressQuery.andWhere("enderecos.cidade ilike :cidade", {
        cidade: `%${cidade}%`,
      });
    }

    if (destinatario) {
      addressQuery.andWhere("enderecos.destinatario ilike :destinatario", {
        destinatario: `%${destinatario}%`,
      });
    }

    if (endereco) {
      addressQuery.andWhere("enderecos.endereco  ilike :endereco", {
        endereco: `%${endereco}%`,
      });
    }

    if (estado) {
      addressQuery.andWhere("enderecos.estado  ilike :estado", {
        estado: `%${estado}%`,
      });
    }

    if (usuarioId) {
      addressQuery.andWhere("usuario_id_fk.id  = :usuarioId", {
        usuarioId: `${usuarioId}`,
      });
    }

    if (cadastroFim) {
      addressQuery.andWhere("enderecos.created_at  < :cadastroFim", {
        cadastroFim: `${new Date(cadastroFim).toUTCString()}`,
      });
    }

    if (cadastroInicio) {
      addressQuery.andWhere("enderecos.created_at  > :cadastroInicio", {
        cadastroInicio: `${new Date(cadastroInicio).toUTCString()}`,
      });
    }

    const address = await addressQuery.take(perPageToShow).skip(skip);

    const encontrados = await address.getCount();

    const pag = {
      paginas:
        encontrados / perPageToShow < 1 ? 1 : encontrados / perPageToShow,
      atual: page,
      encontrados: encontrados,
      exibindo: perPageToShow,
    };

    return {
      enderecos: await address.getMany(),
      pag,
    };
  }

  public async create(data: ICreateEnderecosDTO): Promise<Enderecos> {
    const newEndereco = await this.ormRepository.create(data);
    await this.ormRepository.save(newEndereco);
    return newEndereco;
  }

  public async save(endereco: Enderecos): Promise<Enderecos> {
    return await this.ormRepository.save(endereco);
  }

  public async findById(id: number): Promise<Enderecos | undefined> {
    return await this.ormRepository.findOne({ where: { id } });
  }
}

export default EnderecosRepository;
