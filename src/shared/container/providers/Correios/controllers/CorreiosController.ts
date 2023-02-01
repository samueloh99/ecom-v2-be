import { Request, Response } from "express";
import { container } from "tsyringe";

import CalcularFreteCorreiosService from "@shared/container/providers/Correios/services/CalcularFreteCorreiosService";

export default class CorreiosController {
  public async calcular(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { nCdFormato, nVlPeso, sCepDestino, totalCarrinho } = request.body;

    const calcularFreteCorreiosService = container.resolve(
      CalcularFreteCorreiosService,
    );

    const res = await calcularFreteCorreiosService.execute({
      nCdFormato,
      nVlPeso,
      sCepDestino,
      totalCarrinho,
    });

    return response.json(res);
  }
}
