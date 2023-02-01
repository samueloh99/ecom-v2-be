import { injectable, inject } from 'tsyringe'

import Categorias from '@modules/categorias/infra/typeorm/models/Categorias'
import ICategoriasRepository from '@modules/categorias/repositories/ICategoriasRepository'
import AppError from '@shared/errors/AppError'

interface Request {
  id: number
  nome: string
  ativo: number
  pai_id: number
}

@injectable()
class UpdateCategoriaService {
  constructor(
    @inject('CategoriasRepository')
    private categoriasRepository: ICategoriasRepository
  ) {}

  public async execute({
    id,
    nome,
    ativo,
    pai_id
  }: Request): Promise<Categorias> {
    const findById = await this.categoriasRepository.findById(id)

    if (!findById) {
      throw new AppError('Produto não encontrado.')
    }

    const newObj = {
      nome,
      ativo,
      pai_id
    }

    Object.assign(findById, newObj)

    await this.categoriasRepository.save(findById)

    return findById
  }
}

export default UpdateCategoriaService
