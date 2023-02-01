import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import Usuario from "@modules/usuarios/infra/typeorm/models/Usuarios";
import IUsuariosRepository from "@modules/usuarios/repositories/IUsuariosRepository";
import IHashProvider from "@modules/usuarios/providers/HashProvider/models/IHashProvider";
import ICreateUsuarioDTO from "@modules/usuarios/dtos/ICreateUsuarioDTO";

@injectable()
class CreateUserCheckoutService {
  constructor(
    @inject("UsuariosRepository")
    private usuariosRepository: IUsuariosRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    ativo,
    tipo,
    nome_completo,
    email,
    senha,
    celular,
    telefone,
    cpf,
    nascimento,
    cnpj,
    estrangeiro,
    ie,
    im,
    newsletter,
    genero,
  }: ICreateUsuarioDTO): Promise<Usuario> {
    const checkIfUserExists = await this.usuariosRepository.findByCpf(cpf);
    const checkIfEmailExists = await this.usuariosRepository.findByEmail(email);

    if (checkIfUserExists) {
      throw new AppError("CPF ja cadastrado.", 200);
    } else if (checkIfEmailExists) {
      throw new AppError("Email ja cadastrado.", 200);
    }

    const hashedPassword = await this.hashProvider.generateHash(senha);

    const usuario = await this.usuariosRepository.create({
      ativo,
      tipo,
      nome_completo,
      email,
      senha: hashedPassword,
      celular,
      telefone,
      cpf,
      nascimento,
      genero,
      cnpj,
      estrangeiro,
      ie,
      im,
      newsletter,
    });

    return usuario;
  }
}

export default CreateUserCheckoutService;
