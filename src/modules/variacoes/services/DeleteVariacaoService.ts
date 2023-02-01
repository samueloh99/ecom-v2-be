import { injectable, inject } from 'tsyringe'

import Variacao from '@modules/variacoes/infra/typeorm/models/Variacoes'
import IVariacoesRepository from '@modules/variacoes/repositories/IVariacoesRepository'
import AppError from '@shared/errors/AppError'

interface IRequest {
  id: number
}

@injectable()
class DeleteVariacaoService {
  constructor(
    @inject('VariacoesRepository')
    private variacoesRepository: IVariacoesRepository
  ) {}

  public async execute(data: IRequest): Promise<Variacao> {
    const checkIfUserExists = await this.variacoesRepository.findById(data.id)

    if (!checkIfUserExists) {
      throw new AppError('ID not found.')
    }

    const deleteVariacao = await this.variacoesRepository.delete(
      checkIfUserExists
    )

    return deleteVariacao
  }
}

export default DeleteVariacaoService
