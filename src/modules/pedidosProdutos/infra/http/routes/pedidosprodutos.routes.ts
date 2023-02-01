import { Router } from "express";

import PedidosProdutosController from "@modules/pedidosProdutos/infra/http/controllers/PedidosProdutosController";

const ordersProductsRouter = Router();
const pedidosProdutosController = new PedidosProdutosController();

ordersProductsRouter.get("/todos", pedidosProdutosController.list);

ordersProductsRouter.post("/", pedidosProdutosController.create);

export default ordersProductsRouter;
