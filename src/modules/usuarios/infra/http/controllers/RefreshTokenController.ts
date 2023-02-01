import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateRefreshTokenService from "@modules/usuarios/services/CreateRefreshTokenService";

export default class RefreshTokenController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { refresh_token } = request.body;

    const createRefreshTokenService = container.resolve(
      CreateRefreshTokenService
    );

    const token = await createRefreshTokenService.execute(refresh_token);

    return response.json(token);
  }
}
