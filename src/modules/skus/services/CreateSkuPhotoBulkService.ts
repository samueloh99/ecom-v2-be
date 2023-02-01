import { injectable, inject } from "tsyringe";

import ISkusRepository from "@modules/skus/repositories/ISkusRepository";

import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";

type IRequest = {
  foto: Express.Multer.File | undefined;
};

type IResponse = {
  url: string;
  id: string;
};

@injectable()
class CreateSkuPhotoBulkService {
  constructor(
    @inject("SkusRepository")
    private skusRepository: ISkusRepository,

    @inject("StorageProvider")
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ foto }: IRequest): Promise<IResponse> {
    if (foto) {
      const referenciaPhoto = foto.filename.split("-");
      const photoSequence = referenciaPhoto[3].split(".")[0];

      const corNome = referenciaPhoto[2]
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase();

      const findProductByRef = await this.skusRepository.findSkuByProductRef(
        referenciaPhoto[1].replace("'", ""),
      );

      if (findProductByRef) {
        const filterByVar1 = findProductByRef.filter(
          item =>
            item.var1fk.nome
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLocaleLowerCase() === corNome,
        );

        Promise.all(
          filterByVar1.map(async item => {
            if (foto && photoSequence === "1" && item.foto1) {
              await this.storageProvider.deleteFile(item.foto1);
            }
            if (foto && photoSequence === "2" && item.foto2) {
              await this.storageProvider.deleteFile(item.foto2);
            }
            if (foto && photoSequence === "3" && item.foto3) {
              await this.storageProvider.deleteFile(item.foto3);
            }
            if (foto && photoSequence === "4" && item.foto4) {
              await this.storageProvider.deleteFile(item.foto4);
            }
            if (foto && photoSequence === "5" && item.foto5) {
              await this.storageProvider.deleteFile(item.foto5);
            }
            if (foto && photoSequence === "6" && item.foto6) {
              await this.storageProvider.deleteFile(item.foto6);
            }
          }),
        );

        const filename = await this.storageProvider.saveFile(foto.filename);
        const newName = `${process.env.AWS_S3_PUBLIC_URL}${filename}`;

        Promise.all(
          filterByVar1.map(async item => {
            await this.skusRepository.updatePhotoSku(
              item.id,
              newName,
              photoSequence,
            );

            return { url: newName, id: filename };
          }),
        );
      }
    }
    return { url: "", id: "" };
  }
}

export default CreateSkuPhotoBulkService;
