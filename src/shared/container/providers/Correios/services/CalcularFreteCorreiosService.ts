import { injectable, inject } from "tsyringe";
import fetch from "node-fetch";

import AppError from "@shared/errors/AppError";

import IFretesRepository from "@modules/configuracoes/repositories/IFretesRepository";
import ICorreiosPacProvider from "@shared/container/providers/Correios/models/ICorreiosPacProvider";
import ICorreiosSedexProvider from "@shared/container/providers/Correios/models/ICorreiosSedexProvider";

interface IRequest {
  sCepDestino: string;
  nVlPeso: string;
  nCdFormato: number;
  totalCarrinho: number;
}

interface PrecoPrazoResponse {
  [name: string]: {
    Codigo: string;
    Valor: string;
    PrazoEntrega: string;
    ValorSemAdicionais: string;
    ValorMaoPropria: string;
    ValorAvisoRecebimento: string;
    ValorDeclarado: string;
    EntregaDomiciliar: string;
    EntregaSabado: string;
    obsFim: string;
    Erro: string;
    MsgErro: string;
  };
}

interface ViaCEPResponse {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
  erro?: boolean;
}

interface IResponse {
  prazo: string;
  valor: string;
  cod_servico: string;
  frete_gratis: boolean;
  error: boolean;
  frete_nome: string;
  errorMsg: string;
}

@injectable()
class CalcularFreteCorreiosService {
  constructor(
    @inject("CorreiosPacProvider")
    private correiosPacProvider: ICorreiosPacProvider,

    @inject("CorreiosSedexProvider")
    private correiosSedexProvider: ICorreiosSedexProvider,

    @inject("FretesRepository")
    private fretesRepository: IFretesRepository,
  ) {}

  public async execute({
    nCdFormato,
    nVlPeso,
    sCepDestino,
    totalCarrinho,
  }: IRequest): Promise<IResponse[]> {
    let data: ViaCEPResponse;
    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${sCepDestino}/json/`,
        { method: "GET" },
      );

      data = await response.json();
      if (data.erro) {
        throw new AppError("CEP INVÁLIDO", 200);
      }
    } catch (err) {
      throw new AppError("CEP INVÁLIDO", 200);
    }

    const regrasFrete = await this.fretesRepository.list();
    let checkList: Boolean[] = [];

    regrasFrete.map(item => {
      const { cep_maximo, cep_minimo, compra_minima } = item;

      if (
        cep_maximo >= sCepDestino &&
        cep_minimo <= sCepDestino &&
        parseFloat(compra_minima) <= totalCarrinho
      ) {
        checkList.push(true);
      } else {
        checkList.push(false);
      }
    });

    const calculoSedex = await this.correiosSedexProvider.calcFreteSedex({
      nCdFormato,
      nVlPeso,
      sCepDestino,
    });

    const calculoPac = await this.correiosPacProvider.calcFretePac({
      nCdFormato,
      nVlPeso,
      sCepDestino,
    });

    if (calculoPac[0].Erro !== "0") {
      return [
        {
          cod_servico: "",
          error: true,
          errorMsg: calculoPac[0].MsgErro,
          frete_gratis: false,
          prazo: "",
          valor: "",
          frete_nome: "",
        },
      ];
    } else if (calculoSedex[0].Erro !== "0") {
      return [
        {
          cod_servico: "",
          error: true,
          errorMsg: calculoPac[0].MsgErro,
          frete_gratis: false,
          prazo: "",
          frete_nome: "",
          valor: "",
        },
      ];
    }

    if (checkList.includes(true) && data.uf === "SP") {
      return [
        {
          cod_servico: "grátis",
          frete_gratis: true,
          prazo: String(parseInt(calculoSedex[0].PrazoEntrega) + 2),
          valor: "0",
          error: false,
          errorMsg: "",
          frete_nome: "SEDEX",
        },
      ];
    }

    if (checkList.includes(true) && data.uf !== "SP") {
      return [
        {
          cod_servico: "grátis",
          frete_gratis: true,
          prazo: String(parseInt(calculoPac[0].PrazoEntrega) + 2),
          valor: "0",
          error: false,
          errorMsg: "",
          frete_nome: "PAC",
        },
        {
          cod_servico: "grátis",
          frete_gratis: true,
          prazo: String(parseInt(calculoSedex[0].PrazoEntrega) + 2),
          valor: "0",
          error: false,
          errorMsg: "",
          frete_nome: "SEDEX",
        },
      ];
    }

    if (data.uf !== "SP" && checkList.includes(false)) {
      return [
        {
          cod_servico: calculoPac[0].Codigo,
          frete_gratis: false,
          prazo: String(parseInt(calculoPac[0].PrazoEntrega) + 2),
          valor: calculoPac[0].Valor,
          error: false,
          errorMsg: "",
          frete_nome: "PAC",
        },
        {
          cod_servico: calculoSedex[0].Codigo,
          frete_gratis: false,
          prazo: String(parseInt(calculoSedex[0].PrazoEntrega) + 2),
          valor: calculoSedex[0].Valor,
          error: false,
          errorMsg: "",
          frete_nome: "SEDEX",
        },
      ];
    }

    if (data.uf === "SP" && checkList.includes(false)) {
      return [
        {
          cod_servico: calculoSedex[0].Codigo,
          frete_gratis: false,
          prazo: String(parseInt(calculoSedex[0].PrazoEntrega) + 2),
          valor: calculoSedex[0].Valor,
          error: false,
          errorMsg: "",
          frete_nome: "SEDEX",
        },
      ];
    }

    return [];
  }
}

export default CalcularFreteCorreiosService;
