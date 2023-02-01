import ICreateFornecedorDTO from "@modules/fornecedores/dtos/ICreateFornecedorDTO";
import IFornecedoresRepository from "@modules/fornecedores/repositories/IFornecedoresRepository";
import { getRepository, Repository } from "typeorm";

import Fornecedores from "@modules/fornecedores/infra/typeorm/models/Fornecedores";

class FornecedoresRepository implements IFornecedoresRepository {
  private ormRepository: Repository<Fornecedores>;

  constructor() {
    this.ormRepository = getRepository(Fornecedores);
  }

  public async create(data: ICreateFornecedorDTO): Promise<Fornecedores> {
    const fornecedor = this.ormRepository.create(data);

    await this.ormRepository.save(fornecedor);

    return fornecedor;
  }

  public async list(): Promise<Fornecedores[]> {
    const all = await this.ormRepository.find();

    return all;
  }

  public async findByName(nome: string): Promise<Fornecedores | undefined> {
    const findSupplier = await this.ormRepository.findOne({
      where: { nome },
    });
    return findSupplier;
  }

  public async findById(id: number): Promise<Fornecedores | undefined> {
    const findFornecedorById = await this.ormRepository.findOne({
      where: { id },
    });

    return findFornecedorById;
  }

  public async delete(fornecedor: Fornecedores): Promise<Fornecedores> {
    const deleteFornecedor = await this.ormRepository.remove(fornecedor);
    return deleteFornecedor;
  }

  public async save(data: ICreateFornecedorDTO): Promise<Fornecedores> {
    return await this.ormRepository.save(data);
  }
}

export default FornecedoresRepository;
