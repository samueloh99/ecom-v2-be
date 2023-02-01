import { injectable, inject } from 'tsyringe'

import Fornecedor from '@modules/fornecedores/infra/typeorm/models/Fornecedores'
import IFornecedoresRepository from '@modules/fornecedores/repositories/IFornecedoresRepository'
import AppError from '@shared/errors/AppError'

interface IRequest {
  id: number
}

@injectable()
class DeleteFornecedorService {
  constructor(
    @inject('FornecedoresRepository')
    private fornecedoresRepository: IFornecedoresRepository
  ) {}

  public async execute(data: IRequest): Promise<Fornecedor> {
    const checkIfFornecedorExists = await this.fornecedoresRepository.findById(
      data.id
    )

    if (!checkIfFornecedorExists) {
      throw new AppError('ID not found.')
    }

    const deleteFornecedor = await this.fornecedoresRepository.delete(
      checkIfFornecedorExists
    )

    return deleteFornecedor
  }
}

export default DeleteFornecedorService
