import { injectable, inject } from "tsyringe";

import Variacoes from "@modules/variacoes/infra/typeorm/models/Variacoes";
import IVariacoesRepository from "@modules/variacoes/repositories/IVariacoesRepository";

import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";

import AppError from "@shared/errors/AppError";
import { Multer } from "multer";

interface IRequest {
  id: number;
  foto: Express.Multer.File | undefined;
}

@injectable()
class UploadVariacaoPhotoService {
  constructor(
    @inject("VariacoesRepository")
    private variacoesRepository: IVariacoesRepository,

    @inject("StorageProvider")
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ id, foto }: IRequest): Promise<Variacoes> {
    const variacao = await this.variacoesRepository.findById(id);

    if (!variacao) {
      throw new AppError("SKU ID Não encontrado.", 401);
    }

    if (variacao.foto && foto) {
      await this.storageProvider.deleteFile(variacao.foto);
    }

    if (foto) {
      const filename1 = await this.storageProvider.saveFile(foto.filename);

      const newName = `${process.env.AWS_S3_PUBLIC_URL}${filename1}`;

      variacao.foto = newName;
      await this.variacoesRepository.save(variacao);
    }

    return variacao;
  }
}

export default UploadVariacaoPhotoService;
