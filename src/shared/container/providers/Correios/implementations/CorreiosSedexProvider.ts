import { calcularPrecoPrazo, PrecoPrazoResponse } from "correios-brasil";

import { getRepository, Repository } from "typeorm";

import CorreiosModel from "@modules/configuracoes/infra/typeorm/models/Correios";
import Depositos from "@modules/configuracoes/infra/typeorm/models/Depositos";
import IFreteProduto from "@shared/container/providers/Correios/dtos/IFreteProduto";

import ICorreiosSedexProvider from "@shared/container/providers/Correios/models/ICorreiosSedexProvider";
import AppError from "@shared/errors/AppError";

class CorreiosSedexProvider implements ICorreiosSedexProvider {
  private ormRepository: Repository<CorreiosModel>;
  private depositoRepository: Repository<Depositos>;

  constructor() {
    this.ormRepository = getRepository(CorreiosModel);
    this.depositoRepository = getRepository(Depositos);
  }

  public async calcFreteSedex({
    nCdFormato,
    nVlPeso,
    sCepDestino,
  }: IFreteProduto): Promise<PrecoPrazoResponse> {
    const correiosData = await this.ormRepository.find();
    const depositoOrigem = await this.depositoRepository.find();

    let args = {
      nCdFormato: `${nCdFormato}`,
      nCdServico: [correiosData[0].sedex_cod],
      nVlAltura: "9",
      nVlComprimento: "18",
      nVlDiametro: "0",
      nVlLargura: "13",
      nVlPeso: nVlPeso,
      sCepDestino: sCepDestino,
      sCepOrigem: depositoOrigem[0].cep_deposito,
      nCdEmpresa: correiosData[0].codigo_adm,
      sDsSenha: correiosData[0].cnpj.slice(0, 8),
    };

    try {
      const data = await calcularPrecoPrazo(args);

      if (data === undefined) {
        throw new AppError("Api dos Correios Indisponível", 200);
      }

      return data;
    } catch (err) {
      console.log(err);

      throw new AppError("Api dos Correios Indisponível", 200);
    }
  }
}

export default CorreiosSedexProvider;
