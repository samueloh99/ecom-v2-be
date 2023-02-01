import { injectable, inject } from 'tsyringe'

import Categoria from '@modules/categorias/infra/typeorm/models/Categorias'
import ICategoriasRepository from '@modules/categorias/repositories/ICategoriasRepository'
import AppError from '@shared/errors/AppError'

interface IRequest {
  id: number
}

@injectable()
class DeleteCategoriaService {
  constructor(
    @inject('CategoriasRepository')
    private categoriasRepository: ICategoriasRepository
  ) {}

  public async execute(data: IRequest): Promise<Categoria> {
    const checkIfUserExists = await this.categoriasRepository.findById(data.id)

    if (!checkIfUserExists) {
      throw new AppError('ID not found.')
    }

    const deleteCategoria = await this.categoriasRepository.delete(
      checkIfUserExists
    )

    return deleteCategoria
  }
}

export default DeleteCategoriaService
