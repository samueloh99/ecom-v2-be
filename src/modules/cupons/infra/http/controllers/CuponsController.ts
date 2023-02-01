import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateCupomService from "@modules/cupons/services/CreateCupomService";
import ListCupomService from "@modules/cupons/services/ListCupomService";
import DeleteCupomService from "@modules/cupons/services/DeleteCupomService";
import UpdateCupomService from "@modules/cupons/services/UpdateCupomService";
import ValidarCupomService from "@modules/cupons/services/ValidarCupomService";

export default class CuponsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      tipo,
      ativo,
      data_1,
      data_2,
      nome,
      codigo,
      quantidade,
      desconto_tipo,
      desconto_valor,
      minimo_item,
      minimo_compra,
      frete_gratis,
      desconto_produto,
      desconto_pagamento,
      reutilizavel,
    } = request.body;

    const createCupomService = container.resolve(CreateCupomService);

    const newCupom = await createCupomService.execute({
      tipo,
      ativo,
      data_1,
      data_2,
      nome,
      codigo,
      quantidade,
      desconto_tipo,
      desconto_valor,
      minimo_item,
      minimo_compra,
      frete_gratis,
      desconto_produto,
      desconto_pagamento,
      reutilizavel,
    });

    return response.json(newCupom);
  }

  public async list(_: Request, response: Response): Promise<Response> {
    const listCupomService = container.resolve(ListCupomService);
    const allCupons = await listCupomService.execute();

    return response.json(allCupons);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCupomService = container.resolve(DeleteCupomService);

    const cupomDeleted = await deleteCupomService.execute({
      id: parseInt(id),
    });

    return response.json(cupomDeleted);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const id = parseInt(request.params.id);
    const {
      tipo,
      ativo,
      data_1,
      data_2,
      nome,
      codigo,
      quantidade,
      desconto_tipo,
      desconto_valor,
      minimo_item,
      minimo_compra,
      frete_gratis,
      desconto_produto,
      desconto_pagamento,
      reutilizavel,
    } = request.body;

    const updateCupomService = container.resolve(UpdateCupomService);

    const cupomUpdated = await updateCupomService.execute({
      id,
      tipo,
      ativo,
      data_1,
      data_2,
      nome,
      codigo,
      quantidade,
      desconto_tipo,
      desconto_valor,
      minimo_item,
      minimo_compra,
      frete_gratis,
      desconto_produto,
      desconto_pagamento,
      reutilizavel,
    });

    return response.json(cupomUpdated);
  }

  public async validar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const {
      codigo,
      valor_carrinho,
      qtd_carrinho,
      usuario_id,
      produto_desconto,
      pagamento_desconto,
    } = request.body;

    const validarCupomService = container.resolve(ValidarCupomService);

    const validarCupom = await validarCupomService.execute({
      codigo,
      valor_carrinho,
      qtd_carrinho,
      usuario_id,
      produto_desconto,
      pagamento_desconto,
    });

    return response.json(validarCupom);
  }
}
