import { getRepository, Repository } from "typeorm";

import IPermissoesRepository from "@modules/usuarios/repositories/IPermissoesRepository";

import Permissoes from "@modules/usuarios/infra/typeorm/models/Permissoes";

import ICreatePermissoesDTO from "@modules/usuarios/dtos/ICreatePermissoesDTO";

class PermissoesRepository implements IPermissoesRepository {
  private ormRepository: Repository<Permissoes>;

  constructor() {
    this.ormRepository = getRepository(Permissoes);
  }

  public async findByIds(permissoes: Permissoes[]): Promise<Permissoes[]> {
    return await this.ormRepository.findByIds(permissoes);
  }

  public async create({
    nome,
    descricao,
  }: ICreatePermissoesDTO): Promise<Permissoes> {
    const permissao = this.ormRepository.create({ nome, descricao });

    await this.ormRepository.save(permissao);

    return permissao;
  }

  public async findPermissaoByNome(
    nome: string
  ): Promise<Permissoes | undefined> {
    const findByName = await this.ormRepository.findOne({
      where: { nome },
    });

    return findByName;
  }
}

export default PermissoesRepository;
