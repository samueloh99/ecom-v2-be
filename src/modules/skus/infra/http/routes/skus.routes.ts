import { Router } from "express";

import multer from "multer";

import uploadConfig from "@config/upload";

import SkusController from "@modules/skus/infra/http/controllers/SkusController";
import SkusBulkController from "@modules/skus/infra/http/controllers/SkusBulkController";
import SkusPhotosBulkController from "@modules/skus/infra/http/controllers/SkusPhotosBulkController";
import ensureAuthenticated from "@modules/usuarios/infra/http/middlewares/ensureAthenticated";
import logRegister from "@shared/middlewares/logRegister";

const skusRouter = Router();

const upload = multer(uploadConfig.multer);

const multerConfig = multer();

upload.array("files");

const multipleUpload = upload.fields([
  { name: "foto1" },
  { name: "foto2" },
  { name: "foto3" },
  { name: "foto4" },
  { name: "foto5" },
  { name: "foto6" },
]);

const skusController = new SkusController();

const skusBulkController = new SkusBulkController();

const skusPhotosBulkController = new SkusPhotosBulkController();

skusRouter.get("/todos", skusController.list);

skusRouter.post(
  "/bulk_fotos",
  upload.single("file"),
  skusPhotosBulkController.create,
);

skusRouter.get("/bulk_fotos", skusPhotosBulkController.list);

skusRouter.post(
  "/bulk_produto",
  multerConfig.single("file"),
  skusBulkController.create,
);

skusRouter.post(
  "/",
  ensureAuthenticated,
  logRegister(["skus", "adicionar"]),
  skusController.create,
);

skusRouter.get("/buscar/cat/:id", skusController.filter);

skusRouter.get("/buscar/variantes/cat/:id", skusController.filter_variants);

skusRouter.get("/buscar/:id", skusController.buscarSkuId);

skusRouter.get("/buscar", skusController.buscar);

skusRouter.patch("/editar/:id", skusController.update);

skusRouter.delete("/apagar/:id", skusController.deleteSku);

skusRouter.patch(
  "/produto_foto/adicionar/:id",
  multipleUpload,
  skusController.updatePhoto,
);

skusRouter.post("/homepage/filtrar", skusController.buscarSkusHome);

skusRouter.get("/csv/download", skusBulkController.download_csv);

export default skusRouter;
