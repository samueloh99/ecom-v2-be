import { Router } from "express";

import multer from "multer";

import uploadConfig from "@config/upload";

import ProdutosController from "@modules/produtos/infra/http/controllers/ProdutosController";
import ProdutosBulkController from "@modules/produtos/infra/http/controllers/ProdutosBulkController";
import ProductsBlingController from "../controllers/bling/ProductsBlingController";
import ensureAuthenticated from "@modules/usuarios/infra/http/middlewares/ensureAthenticated";
import logRegister from "@shared/middlewares/logRegister";

const produtosRouter = Router();
const produtosController = new ProdutosController();
const productsBlingController = new ProductsBlingController();
const produtosBulkController = new ProdutosBulkController();

const upload = multer(uploadConfig.multer);

// BLING

produtosRouter.get("/bling", productsBlingController.list);

produtosRouter.post(
  "/bling/create_consume_sqs",
  productsBlingController.create_consume,
);

produtosRouter.post("/bling", productsBlingController.create_bulk);

// DATABASE

produtosRouter.get("/todos", produtosController.list);

produtosRouter.get("/buscar/todos", produtosController.listWithoutPagination);

produtosRouter.get("/buscar/:id", produtosController.findByProdutoId);

produtosRouter.patch(
  "/sub_categorias/:id",
  produtosController.updateSubCategory,
);

produtosRouter.patch(
  "/adicionar_produto_categoria",
  produtosController.addProductToCategory,
);

produtosRouter.delete(
  "/apagar/:id",
  ensureAuthenticated,
  logRegister(["produtos", "apagar"]),
  produtosController.deleteProduto,
);

produtosRouter.post(
  "/",
  ensureAuthenticated,
  logRegister(["produtos", "adicionar"]),
  produtosController.create,
);

produtosRouter.patch("/editar/:id", produtosController.updateProduto);

produtosRouter.patch("/editar/tags/:id", produtosController.updateProdutoTags);

produtosRouter.post(
  "/bulk/descricao",
  upload.single("file"),
  produtosBulkController.create,
);

export default produtosRouter;
