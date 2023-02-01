import { injectable, inject } from "tsyringe";

import ISkusRepository from "@modules/skus/repositories/ISkusRepository";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";

import Skus from "@modules/skus/infra/typeorm/models/Skus";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: number;
  fotos: { [fieldname: string]: Express.Multer.File[] };
}

@injectable()
class UpdateSkuPhotoService {
  constructor(
    @inject("SkusRepository")
    private skusRepository: ISkusRepository,

    @inject("StorageProvider")
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ id, fotos }: IRequest): Promise<Skus> {
    const sku = await this.skusRepository.findSkuById(id);

    if (!sku) {
      throw new AppError("SKU ID Não encontrado.", 404);
    }

    const allSkus = await this.skusRepository.listWithoutPagination();

    const skuFilteredWithVar1 = allSkus
      .filter(item => item.produto_id === sku.produto_id)
      .filter(item => item.var1fk.nome === sku.var1fk.nome);

    if (sku.foto1 && fotos["foto1"]) {
      await this.storageProvider.deleteFile(sku.foto1);
    }

    if (fotos["foto1"]) {
      const filename1 = await this.storageProvider.saveFile(
        fotos["foto1"][0].filename,
      );

      const newName = `${process.env.AWS_S3_PUBLIC_URL}${filename1}`;

      skuFilteredWithVar1.map(async item => {
        item.foto1 = newName;
        await this.skusRepository.save(item);
      });
    }

    if (sku.foto2 && fotos["foto2"]) {
      await this.storageProvider.deleteFile(sku.foto2);
    }

    if (fotos["foto2"]) {
      const filename1 = await this.storageProvider.saveFile(
        fotos["foto2"][0].filename,
      );

      const newName = `${process.env.AWS_S3_PUBLIC_URL}${filename1}`;

      skuFilteredWithVar1.map(async item => {
        item.foto2 = newName;
        await this.skusRepository.save(item);
      });
    }

    if (sku.foto3 && fotos["foto3"]) {
      await this.storageProvider.deleteFile(sku.foto3);
    }

    if (fotos["foto3"]) {
      const filename1 = await this.storageProvider.saveFile(
        fotos["foto3"][0].filename,
      );

      const newName = `${process.env.AWS_S3_PUBLIC_URL}${filename1}`;

      skuFilteredWithVar1.map(async item => {
        item.foto3 = newName;
        await this.skusRepository.save(item);
      });
    }

    if (sku.foto4 && fotos["foto4"]) {
      await this.storageProvider.deleteFile(sku.foto4);
    }

    if (fotos["foto4"]) {
      const filename1 = await this.storageProvider.saveFile(
        fotos["foto4"][0].filename,
      );

      const newName = `${process.env.AWS_S3_PUBLIC_URL}${filename1}`;

      skuFilteredWithVar1.map(async item => {
        item.foto4 = newName;
        await this.skusRepository.save(item);
      });
    }

    if (sku.foto5 && fotos["foto5"]) {
      await this.storageProvider.deleteFile(sku.foto5);
    }

    if (fotos["foto5"]) {
      const filename1 = await this.storageProvider.saveFile(
        fotos["foto5"][0].filename,
      );

      const newName = `${process.env.AWS_S3_PUBLIC_URL}${filename1}`;

      skuFilteredWithVar1.map(async item => {
        item.foto5 = newName;
        await this.skusRepository.save(item);
      });
    }

    if (sku.foto6 && fotos["foto6"]) {
      await this.storageProvider.deleteFile(sku.foto6);
    }

    if (fotos["foto6"]) {
      const filename1 = await this.storageProvider.saveFile(
        fotos["foto6"][0].filename,
      );

      const newName = `${process.env.AWS_S3_PUBLIC_URL}${filename1}`;

      skuFilteredWithVar1.map(async item => {
        item.foto6 = newName;
        await this.skusRepository.save(item);
      });
    }

    return sku;
  }
}

export default UpdateSkuPhotoService;
