import { injectable, inject } from 'tsyringe'

import Fornecedores from '@modules/fornecedores/infra/typeorm/models/Fornecedores'
import IFornecedoresRepository from '@modules/fornecedores/repositories/IFornecedoresRepository'
import AppError from '@shared/errors/AppError'

interface Request {
  id: number
  nome: string
  site: string
  email: string
  telefone: string
  observacoes: string
  ativo: number
}

@injectable()
class UpdateFornecedorService {
  constructor(
    @inject('FornecedoresRepository')
    private fornecedoresRepository: IFornecedoresRepository
  ) {}

  public async execute({
    id,
    nome,
    site,
    email,
    telefone,
    observacoes,
    ativo
  }: Request): Promise<Fornecedores> {
    const findById = await this.fornecedoresRepository.findById(id)

    if (!findById) {
      throw new AppError('Fornecedor não encontrado.')
    }

    const newObj = {
      id,
      nome,
      site,
      email,
      telefone,
      observacoes,
      ativo
    }

    Object.assign(findById, newObj)

    await this.fornecedoresRepository.save(findById)

    return findById
  }
}

export default UpdateFornecedorService
