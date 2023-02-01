import { injectable, inject } from "tsyringe";

import IEnderecosRepository from "@modules/usuarios/repositories/IEnderecosRepository";

import Endereco from "@modules/usuarios/infra/typeorm/models/Enderecos";

import ICreateEnderecosDTO from "@modules/usuarios/dtos/ICreateEnderecosDTO";

@injectable()
class CreateEnderecoService {
  constructor(
    @inject("EnderecosRepository")
    private enderecosRepository: IEnderecosRepository,
  ) {}

  public async execute(data: ICreateEnderecosDTO): Promise<Endereco> {
    const newEndereco = await this.enderecosRepository.create(data);

    return newEndereco;
  }
}

export default CreateEnderecoService;
