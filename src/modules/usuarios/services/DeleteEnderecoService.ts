import { injectable, inject } from "tsyringe";

import Endereco from "@modules/usuarios/infra/typeorm/models/Enderecos";
import IEnderecosRepository from "@modules/usuarios/repositories/IEnderecosRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: number;
}

@injectable()
class DeleteEnderecoService {
  constructor(
    @inject("EnderecosRepository")
    private enderecosRepository: IEnderecosRepository,
  ) {}

  public async execute(data: IRequest): Promise<Endereco> {
    const checkIfEnderecoExists = await this.enderecosRepository.findById(
      data.id,
    );

    if (!checkIfEnderecoExists) {
      throw new AppError("Endereco Näo encontrado.");
    }

    const deleteEndereco = await this.enderecosRepository.delete(
      checkIfEnderecoExists,
    );

    return deleteEndereco;
  }
}

export default DeleteEnderecoService;
