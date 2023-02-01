import { Router } from "express";

import OrdersBlingController from "@modules/pedidos/infra/http/controllers/bling/OrdersBlingController";

const blingRouter = Router();
const ordersBlingController = new OrdersBlingController();

blingRouter.get("/orders", ordersBlingController.list);

blingRouter.post("/orders", ordersBlingController.create);

export default blingRouter;
