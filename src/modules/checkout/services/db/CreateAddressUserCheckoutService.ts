import { injectable, inject } from "tsyringe";

import Endereco from "@modules/usuarios/infra/typeorm/models/Enderecos";
import IEnderecosRepository from "@modules/usuarios/repositories/IEnderecosRepository";
import ICreateEnderecosDTO from "@modules/usuarios/dtos/ICreateEnderecosDTO";

@injectable()
class CreateAddressUserCheckoutService {
  constructor(
    @inject("EnderecosRepository")
    private enderecosRepository: IEnderecosRepository,
  ) {}

  public async execute({
    bairro,
    ativo,
    cep,
    cidade,
    complemento,
    destinatario,
    endereco,
    estado,
    lembrete,
    numero,
    pais,
    usuario_id,
  }: ICreateEnderecosDTO): Promise<Endereco> {
    const newAddress = await this.enderecosRepository.create({
      bairro,
      ativo,
      cep,
      cidade,
      complemento,
      destinatario,
      endereco,
      estado,
      lembrete,
      numero,
      pais,
      usuario_id,
    });

    return newAddress;
  }
}

export default CreateAddressUserCheckoutService;
