import { container } from "tsyringe";

import mailconfig from "@config/mail";

import "@shared/container/providers/StorageProvider";

import EtherealMailProvider from "@shared/container/providers/MailProvider/implementations/EtherealMailProvider";
import SESMailProvider from "@shared/container/providers/MailProvider/implementations/SESMailProvider";
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";

import HandlebarsMailTemplateProvider from "@shared/container/providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider";
import IMailTemplateProvider from "@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider";

import IPagarmeUserProvider from "@shared/container/providers/Pagarme/models/IPagarmeUserProvider";
import PagarmeUserProvider from "@shared/container/providers/Pagarme/implementations/PagarmeUserProvider";

import IPagarmeUserAddressProvider from "@shared/container/providers/Pagarme/models/IPagarmeUserAddressProvider";
import PagarmeUserAddressProvider from "@shared/container/providers/Pagarme/implementations/PagarmeUserAddressProvider";

import IPagarmeOrdersProvider from "@shared/container/providers/Pagarme/models/IPagarmeOrdersProvider";
import PagarmeOrdersProvider from "@shared/container/providers/Pagarme/implementations/PagarmeOrdersProvider";

import IPagarmeUserCardProvider from "@shared/container/providers/Pagarme/models/IPagarmeUserCardProvider";
import PagarmeUserCardProvider from "@shared/container/providers/Pagarme/implementations/PagarmeUserCardProvider";

import ICorreiosPacProvider from "@shared/container/providers/Correios/models/ICorreiosPacProvider";
import CorreiosPacProvider from "@shared/container/providers/Correios/implementations/CorreiosPacProvider";

import ICorreiosSedexProvider from "@shared/container/providers/Correios/models/ICorreiosSedexProvider";
import CorreiosSedexProvider from "@shared/container/providers/Correios/implementations/CorreiosSedexProvider";

import IBlingClientsProvider from "@shared/container/providers/BlingERP/models/IBlingClientsProvider";
import BlingClientsProvider from "@shared/container/providers/BlingERP/implementations/BlingClientsProvider";

import ISQSPagarmeProvider from "@shared/container/providers/SQS/models/ISQSPagarmeProvider";
import SQSPagarmeProvider from "@shared/container/providers/SQS/implementations/SQSPagarmeProvider";

import ISQSBlingProvider from "@shared/container/providers/SQS/models/ISQSBlingProvider";
import SQSBlingProvider from "@shared/container/providers/SQS/implementations/SQSBlingProvider";

import ISQSOrderErrorProvider from "@shared/container/providers/SQS/models/ISQSOrderErrorProvider";
import SQSOrderErrorProvider from "@shared/container/providers/SQS/implementations/SQSOrderErrorProvider";

container.registerSingleton<ISQSOrderErrorProvider>(
  "SQSOrderErrorProvider",
  SQSOrderErrorProvider,
);

container.registerSingleton<ISQSBlingProvider>(
  "SQSBlingProvider",
  SQSBlingProvider,
);

container.registerSingleton<ISQSPagarmeProvider>(
  "SQSPagarmeProvider",
  SQSPagarmeProvider,
);

container.registerSingleton<IMailTemplateProvider>(
  "MailTemplateProvider",
  HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  "MailProvider",
  mailconfig.driver === "ethereal"
    ? container.resolve(EtherealMailProvider)
    : container.resolve(SESMailProvider),
);

container.registerSingleton<IPagarmeUserProvider>(
  "PagarmeUserProvider",
  PagarmeUserProvider,
);

container.registerSingleton<IPagarmeUserAddressProvider>(
  "PagarmeUserAddressProvider",
  PagarmeUserAddressProvider,
);

container.registerSingleton<IPagarmeUserCardProvider>(
  "PagarmeUserCardProvider",
  PagarmeUserCardProvider,
);

container.registerSingleton<IPagarmeOrdersProvider>(
  "PagarmeOrdersProvider",
  PagarmeOrdersProvider,
);

container.registerSingleton<ICorreiosPacProvider>(
  "CorreiosPacProvider",
  CorreiosPacProvider,
);

container.registerSingleton<ICorreiosSedexProvider>(
  "CorreiosSedexProvider",
  CorreiosSedexProvider,
);

container.registerSingleton<IBlingClientsProvider>(
  "BlingClientsProvider",
  BlingClientsProvider,
);
