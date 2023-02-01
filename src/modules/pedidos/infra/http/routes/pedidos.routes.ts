import { Router } from "express";

import PedidosController from "@modules/pedidos/infra/http/controllers/PedidosController";

const ordersRouter = Router();
const pedidosController = new PedidosController();

ordersRouter.get("/todos", pedidosController.list);

ordersRouter.post("/", pedidosController.create);

export default ordersRouter;
