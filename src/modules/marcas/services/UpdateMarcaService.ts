import { injectable, inject } from 'tsyringe'

import Marcas from '@modules/marcas/infra/typeorm/models/Marcas'
import IMarcasRepository from '@modules/marcas/repositories/IMarcasRepository'
import AppError from '@shared/errors/AppError'

interface Request {
  id: number
  nome: string
  ativo: number
}

@injectable()
class UpdateMarcaService {
  constructor(
    @inject('MarcasRepository')
    private marcasRepository: IMarcasRepository
  ) {}

  public async execute({ id, nome, ativo }: Request): Promise<Marcas> {
    const marca = await this.marcasRepository.findById(id)

    if (!marca) {
      throw new AppError('Marca não encontrado.')
    }

    marca.id = id
    marca.nome = nome
    marca.ativo = ativo

    return await this.marcasRepository.save(marca)
  }
}

export default UpdateMarcaService
