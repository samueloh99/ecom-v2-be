import { Router } from "express";

// PAGARME
import UsersCardPagarmeController from "@modules/checkout/infra/http/controllers/pagarme/UsersCardPagarmeController";
import UsersPagarmeController from "@modules/checkout/infra/http/controllers/pagarme/UsersPagarmeController";
import WebhookPagarmeController from "@modules/checkout/infra/http/controllers/pagarme/WebhookPagarmeController";
import UsersAddressPagarmeController from "@modules/checkout/infra/http/controllers/pagarme/UsersAddressPagarmeController";
import OrdersPagarmeController from "@modules/checkout/infra/http/controllers/pagarme/OrdersPagarmeController";

// BLING
import UsersBlingController from "@modules/checkout/infra/http/controllers/bling/UsersBlingController";
import OrdersBlingController from "@modules/checkout/infra/http/controllers/bling/OrdersBlingController";

// DATABASE
import UsersCheckoutController from "@modules/checkout/infra/http/controllers/db/UsersCheckoutController";
import AddressUsersCheckoutController from "@modules/checkout/infra/http/controllers/db/AddressUsersCheckoutController";

// TRANSMISSIONS
import TransmissionsController from "@modules/checkout/infra/http/controllers/transmissions/TransmissionsController";

import OrderErroController from "@modules/checkout/infra/http/controllers/OrderErroController";

const checkoutRouter = Router();

const transmissionsController = new TransmissionsController();
const usersCardPagarmeController = new UsersCardPagarmeController();
const webhookPagarmController = new WebhookPagarmeController();
const ordersPagarmeController = new OrdersPagarmeController();
const usersPagarmeController = new UsersPagarmeController();
const usersAddressPagarmeController = new UsersAddressPagarmeController();
const usersBlingController = new UsersBlingController();
const usersCheckoutController = new UsersCheckoutController();
const addressUsersCheckoutController = new AddressUsersCheckoutController();
const ordersBlingController = new OrdersBlingController();
const orderErroController = new OrderErroController();

// WEBHOOK PAGARME
checkoutRouter.post("/webhook_pagarme", webhookPagarmController.create);
checkoutRouter.get("/list_webhooks", webhookPagarmController.list);

// PAGARME
checkoutRouter.get("/users_pagarme", usersPagarmeController.list);
checkoutRouter.put("/users_pagarme", usersPagarmeController.update);
checkoutRouter.post("/search_orders_pagarme", ordersPagarmeController.list);
checkoutRouter.post("/users_pagarme", usersPagarmeController.create);
checkoutRouter.post("/users_card_pagarme", usersCardPagarmeController.create);
checkoutRouter.post(
  "/users_address_pagarme",
  usersAddressPagarmeController.create,
);
checkoutRouter.post("/orders_pagarme/pix", ordersPagarmeController.create_pix);
checkoutRouter.post(
  "/orders_pagarme/cartao",
  ordersPagarmeController.create_cartao,
);
checkoutRouter.post(
  "/orders_pagarme/boleto",
  ordersPagarmeController.create_boleto,
);

// BLING
checkoutRouter.get("/users_bling", usersBlingController.list);
checkoutRouter.post("/users_bling", usersBlingController.create);
checkoutRouter.post("/orders_bling", ordersBlingController.create);

// DB
checkoutRouter.put("/users", usersCheckoutController.update);
checkoutRouter.post("/users", usersCheckoutController.create);
checkoutRouter.post("/addresses", addressUsersCheckoutController.create);
checkoutRouter.post("/transmissions", transmissionsController.create);
checkoutRouter.get("/transmissions", transmissionsController.list);

checkoutRouter.post("/order_erro/sqs", orderErroController.send);

export default checkoutRouter;
