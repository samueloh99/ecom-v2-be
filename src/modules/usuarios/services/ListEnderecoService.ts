import { injectable, inject } from "tsyringe";

import IEnderecosRepository from "@modules/usuarios/repositories/IEnderecosRepository";

import { IRequest, IResponse } from "@modules/usuarios/dtos/IListEnderecosDTO";

@injectable()
class ListEnderecoService {
  constructor(
    @inject("EnderecosRepository")
    private enderecosRepository: IEnderecosRepository,
  ) {}

  public async execute({
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
    const address = await this.enderecosRepository.list({
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
    });

    return address;
  }
}

export default ListEnderecoService;
