import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";
import Usuario from "@modules/usuarios/infra/typeorm/models/Usuarios";
import IUsuariosRepository from "@modules/usuarios/repositories/IUsuariosRepository";
import IHashProvider from "@modules/usuarios/providers/HashProvider/models/IHashProvider";

interface IRequest {
  id: number;
  tipo: number;
  ativo: number;
  nome_completo: string;
  email: string;
  senha_antiga?: string;
  senha?: string;
  celular: number;
  telefone: number;
  cpf: number;
  nascimento: string;
  genero: string;
  ie: string;
  im: string;
  estrangeiro: number;
  newsletter: number;
  cnpj: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject("UsuariosRepository")
    private usuariosRepository: IUsuariosRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    id,
    tipo,
    ativo,
    nome_completo,
    email,
    senha_antiga,
    senha,
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
  }: IRequest): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findById(id);

    if (!usuario) {
      throw new AppError("Usuario nao encontrado", 203);
    }

    usuario.nome_completo = nome_completo;
    usuario.email = email;
    usuario.tipo = tipo;
    usuario.celular = celular;
    usuario.cpf = cpf;
    usuario.telefone = telefone;
    usuario.genero = genero;
    usuario.nascimento = nascimento;
    usuario.ativo = ativo;
    usuario.ie = ie;
    usuario.im = im;
    usuario.cnpj = cnpj;
    usuario.estrangeiro = estrangeiro;
    usuario.newsletter = newsletter;

    if (senha && !senha_antiga) {
      throw new AppError("Informe a sua senha antiga para mudar a senha.");
    }

    if (senha && senha_antiga) {
      const checkOldPassword = await this.hashProvider.compareHash(
        senha_antiga,
        usuario.senha,
      );

      if (!checkOldPassword) {
        throw new AppError("Senha antiga inválida.", 203);
      }

      usuario.senha = await this.hashProvider.generateHash(senha);
    }

    return this.usuariosRepository.save(usuario);
  }
}

export default UpdateProfileService;
