import { injectable, inject } from "tsyringe";

import IFornecedoresRepository from "@modules/fornecedores/repositories/IFornecedoresRepository";
import Fornecedores from "@modules/fornecedores/infra/typeorm/models/Fornecedores";
import AppError from "@shared/errors/AppError";
interface IRequest {
  nome: string;
  site: string;
  email: string;
  telefone: string;
  observacoes: string;
  ativo: number;
}

@injectable()
class CreateFornecedorService {
  constructor(
    @inject("FornecedoresRepository")
    private fornecedoresRepository: IFornecedoresRepository
  ) {}

  public async execute({
    nome,
    site,
    email,
    telefone,
    observacoes,
    ativo,
  }: IRequest): Promise<Fornecedores> {
    const findSameSupplier = await this.fornecedoresRepository.findByName(nome);

    if (findSameSupplier) {
      throw new AppError("Esse Fornecedor ja foi cadastrado");
    }

    const fornecedor = await this.fornecedoresRepository.create({
      nome,
      site,
      email,
      telefone,
      observacoes,
      ativo,
    });

    return fornecedor;
  }
}

export default CreateFornecedorService;
