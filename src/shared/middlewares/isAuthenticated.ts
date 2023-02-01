import { NextFunction, Request, Response } from "express";

import AppError from "@shared/errors/AppError";

export default function isAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction,
): void {
  if (request.path === "/checkout/webhook_pagarme") {
    return next();
  }

  if (request.path === "/checkout/order_erro/sqs") {
    return next();
  }

  const authHeader = request.headers["secret-key"];

  if (!authHeader) {
    throw new AppError("JWT token is missing", 401);
  }

  try {
    const decoded = process.env.APP_SECRET === authHeader;

    if (!decoded) {
      throw new AppError("Unauthorized", 401);
    }

    return next();
  } catch {
    throw new AppError("Unauthorized", 401);
  }
}
