import ICreateVariacaoDTO from "@modules/variacoes/dtos/ICreateVariacaoDTO";
import IVariacoesRepository from "@modules/variacoes/repositories/IVariacoesRepository";
import { getRepository, Repository } from "typeorm";

import Variacoes from "@modules/variacoes/infra/typeorm/models/Variacoes";

class VariacoesRepository implements IVariacoesRepository {
  private ormRepository: Repository<Variacoes>;

  constructor() {
    this.ormRepository = getRepository(Variacoes);
  }

  public async delete(data: Variacoes): Promise<Variacoes> {
    return await this.ormRepository.remove(data);
  }

  public async findById(id: number): Promise<Variacoes | undefined> {
    const findById = await this.ormRepository.findOne({
      where: { id },
    });

    return findById;
  }

  public async save(data: ICreateVariacaoDTO): Promise<Variacoes> {
    return await this.ormRepository.save(data);
  }

  public async create({
    nome,
    ativo,
    pai_id,
    cor_fundo,
    foto,
  }: ICreateVariacaoDTO): Promise<Variacoes> {
    const variacao = this.ormRepository.create({
      nome,
      ativo,
      pai_id,
      cor_fundo,
      foto,
    });

    await this.ormRepository.save(variacao);

    return variacao;
  }

  public async list(): Promise<Variacoes[]> {
    const all = await this.ormRepository.find();

    return all;
  }

  public async findByName(nome: string): Promise<Variacoes | undefined> {
    const findVariacao = await this.ormRepository.findOne({
      where: { nome },
    });

    return findVariacao;
  }
}

export default VariacoesRepository;
