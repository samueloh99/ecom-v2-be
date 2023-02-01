import { injectable, inject } from 'tsyringe'

import Usuario from '@modules/usuarios/infra/typeorm/models/Usuarios'
import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository'
import AppError from '@shared/errors/AppError'

interface IRequest {
  id: number
}

@injectable()
class DeleteUsuarioService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository
  ) {}

  public async execute(data: IRequest): Promise<Usuario> {
    const checkIfUserExists = await this.usuariosRepository.findById(data.id)

    if (!checkIfUserExists) {
      throw new AppError('ID not found.')
    }

    const deleteUsuario = await this.usuariosRepository.delete(
      checkIfUserExists
    )

    return deleteUsuario
  }
}

export default DeleteUsuarioService
