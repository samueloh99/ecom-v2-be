import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";
import Endereco from "@modules/usuarios/infra/typeorm/models/Enderecos";
import IEnderecosRepository from "@modules/usuarios/repositories/IEnderecosRepository";

interface IRequest {
  id: number;
  usuario_id: number;
  ativo: number;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  pais: string;
  lembrete: string;
  destinatario: string;
}

@injectable()
class UpdateEnderecoService {
  constructor(
    @inject("EnderecosRepository")
    private enderecosRepository: IEnderecosRepository,
  ) {}

  public async execute({
    id,
    ativo,
    cep,
    endereco,
    numero,
    complemento,
    bairro,
    cidade,
    estado,
    pais,
    lembrete,
    destinatario,
  }: IRequest): Promise<Endereco> {
    const enderecoResult = await this.enderecosRepository.findById(id);

    if (!enderecoResult) {
      throw new AppError("Endereco näo encontrado");
    }

    enderecoResult.ativo = ativo;
    enderecoResult.cep = cep;
    enderecoResult.endereco = endereco;
    enderecoResult.bairro = bairro;
    enderecoResult.numero = numero;
    enderecoResult.complemento = complemento;
    enderecoResult.cidade = cidade;
    enderecoResult.estado = estado;
    enderecoResult.pais = pais;
    enderecoResult.lembrete = lembrete;
    enderecoResult.destinatario = destinatario;

    return this.enderecosRepository.save(enderecoResult);
  }
}

export default UpdateEnderecoService;
