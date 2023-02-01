import "reflect-metadata";
import "dotenv/config";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { errors } from "celebrate";
import "express-async-errors";

import routes from "@shared/infra/http/routes";

import AppError from "@shared/errors/AppError";

import "@shared/infra/typeorm";

import "@shared/container";

import uploadConfig from "@config/upload";

import "SQSReceiveMessage";
import isAuthenticated from "@shared/middlewares/isAuthenticated";

const app = express();

Sentry.init({
  dsn: process.env.SENTRY_ID,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(cors());
app.use(express.json());
app.use("/files", express.static(uploadConfig.tmpFolder));
app.use(isAuthenticated);

app.use(routes);

app.use(Sentry.Handlers.errorHandler());

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: "error", message: err.message });
  }

  console.error(err);

  return response
    .status(500)
    .json({ status: "error", message: "Internal server error" });
});

app.listen(3333, () => {
  console.log("🚀 Server started on port 3333");
});
