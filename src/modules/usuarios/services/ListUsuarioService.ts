import { injectable, inject } from "tsyringe";

import IUsuariosRepository from "@modules/usuarios/repositories/IUsuariosRepository";
import { IRequest, IResponse } from "@modules/usuarios/dtos/IListUsersDTO";

@injectable()
class ListUsuarioService {
  constructor(
    @inject("UsuariosRepository")
    private usuariosRepository: IUsuariosRepository,
  ) {}

  public async execute({
    cadastroFim,
    cadastroInicio,
    celular,
    codigo,
    cpf,
    currentPage,
    email,
    genero,
    nome,
    perPage,
    recebeNewsletter,
    telefone,
  }: IRequest): Promise<IResponse> {
    const all = await this.usuariosRepository.list({
      cadastroFim,
      cadastroInicio,
      celular,
      codigo,
      cpf,
      currentPage,
      email,
      genero,
      nome,
      perPage,
      recebeNewsletter,
      telefone,
    });

    return all;
  }
}

export default ListUsuarioService;
