import IUsuariosRepository from "@modules/usuarios/repositories/IUsuariosRepository";
import { getRepository, Repository } from "typeorm";

import Usuarios from "@modules/usuarios/infra/typeorm/models/Usuarios";

import ICreateUsuarioDTO from "@modules/usuarios/dtos/ICreateUsuarioDTO";
import { IRequest, IResponse } from "@modules/usuarios/dtos/IListUsersDTO";

class UsuariosRepository implements IUsuariosRepository {
  private ormRepository: Repository<Usuarios>;

  constructor() {
    this.ormRepository = getRepository(Usuarios);
  }

  public async listWithoutPagination(): Promise<Usuarios[]> {
    const all = await this.ormRepository.find({
      relations: ["roles", "permissoes"],
    });

    return all;
  }

  public async delete(usuario: Usuarios): Promise<Usuarios> {
    const deleteUsuario = await this.ormRepository.remove(usuario);
    return deleteUsuario;
  }

  public async save(usuario: Usuarios): Promise<Usuarios> {
    return await this.ormRepository.save(usuario);
  }

  public async findById(id: number): Promise<Usuarios | undefined> {
    const findUsuarioById = await this.ormRepository.findOne({
      where: { id },
      relations: ["permissoes", "roles"],
    });

    return findUsuarioById;
  }

  public async findByCpf(cpf: number): Promise<Usuarios | undefined> {
    const findUsuariosWithSameCpf = await this.ormRepository.findOne({
      where: { cpf },
      relations: ["roles", "permissoes"],
    });

    return findUsuariosWithSameCpf;
  }

  public async findByEmail(email: string): Promise<Usuarios | undefined> {
    const findUsuariosWithSameEmail = await this.ormRepository.findOne({
      where: { email },
      relations: ["roles", "permissoes"],
    });

    return findUsuariosWithSameEmail;
  }

  public async create(data: ICreateUsuarioDTO): Promise<Usuarios> {
    const usuario = this.ormRepository.create(data);

    await this.ormRepository.save(usuario);

    return usuario;
  }

  public async list({
    cadastroFim,
    cadastroInicio,
    celular,
    codigo,
    cpf,
    currentPage,
    email,
    genero,
    nome,
    perPage,
    recebeNewsletter,
    telefone,
  }: IRequest): Promise<IResponse> {
    const countUsuarios = await this.ormRepository.find();
    const perPageToShow = !perPage === true ? countUsuarios.length : perPage;
    const page = !currentPage === true ? 1 : currentPage;
    const skip = perPageToShow * page - perPageToShow;

    const usuariosQuery = await this.ormRepository
      .createQueryBuilder("usuarios")
      .leftJoinAndSelect("usuarios.roles", "roles")
      .leftJoinAndSelect("usuarios.permissoes", "permissoes");

    if (cadastroFim) {
      usuariosQuery.andWhere("usuarios.created_at  < :cadastroFim", {
        cadastroFim: `${new Date(cadastroFim).toUTCString()}`,
      });
    }

    if (cadastroInicio) {
      usuariosQuery.andWhere("usuarios.created_at  > :cadastroInicio", {
        cadastroInicio: `${new Date(cadastroInicio).toUTCString()}`,
      });
    }

    if (telefone) {
      usuariosQuery.andWhere("usuarios.telefone ilike :telefone", {
        telefone: `%${telefone}%`,
      });
    }

    if (recebeNewsletter) {
      usuariosQuery.andWhere("usuarios.newsletter = 1");
    }

    if (nome) {
      usuariosQuery.andWhere("usuarios.nome_completo ilike :nome", {
        nome: `%${nome}%`,
      });
    }

    if (genero) {
      usuariosQuery.andWhere("usuarios.genero ilike :genero", {
        genero: `%${genero}%`,
      });
    }

    if (cpf) {
      usuariosQuery.andWhere("usuarios.cpf ilike :cpf", {
        cpf: `%${cpf}%`,
      });
    }

    if (email) {
      usuariosQuery.andWhere("usuarios.email ilike :email", {
        email: `%${email}%`,
      });
    }

    if (codigo) {
      usuariosQuery.andWhere("usuarios.id  = :codigo", {
        codigo: `${codigo}`,
      });
    }

    if (celular) {
      usuariosQuery.andWhere("usuarios.celular  ilike :celular", {
        celular: `%${celular}%`,
      });
    }

    const usuarios = await usuariosQuery.take(perPageToShow).skip(skip);

    const encontrados = await usuarios.getCount();

    const pag = {
      paginas:
        encontrados / perPageToShow < 1 ? 1 : encontrados / perPageToShow,
      atual: page,
      encontrados: encontrados,
      exibindo: perPageToShow,
    };

    return {
      usuarios: await usuarios.getMany(),
      pag,
    };
  }
}

export default UsuariosRepository;
