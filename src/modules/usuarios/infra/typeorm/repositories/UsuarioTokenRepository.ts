import { getRepository, Repository } from 'typeorm'

import IUsuarioTokensRepository from '@modules/usuarios/repositories/IUsuarioTokensRepository'

import UsuarioToken from '@modules/usuarios/infra/typeorm/models/UsuariosToken'

class UsuarioTokensRepository implements IUsuarioTokensRepository {
  private ormRepository: Repository<UsuarioToken>

  constructor() {
    this.ormRepository = getRepository(UsuarioToken)
  }

  public async findByToken(token: string): Promise<UsuarioToken | undefined> {
    const usuarioToken = await this.ormRepository.findOne({
      where: { token }
    })

    return usuarioToken
  }

  public async generate(usuario_id: number): Promise<UsuarioToken> {
    const usuarioToken = this.ormRepository.create({ usuario_id })

    await this.ormRepository.save(usuarioToken)

    return usuarioToken
  }
}

export default UsuarioTokensRepository
