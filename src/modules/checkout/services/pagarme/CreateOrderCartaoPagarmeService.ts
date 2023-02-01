import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import IEnderecosRepository from "@modules/usuarios/repositories/IEnderecosRepository";
import IUsuariosRepository from "@modules/usuarios/repositories/IUsuariosRepository";

import PagarmeOrdersProvider from "@shared/container/providers/Pagarme/implementations/PagarmeOrdersProvider";

import ICreateOrderCreditCardPagarmeDTO from "@modules/checkout/dtos/ICreateOrderCreditCardPagarmeDTO";
import ICreateOrderCartaoResponse from "@shared/container/providers/Pagarme/dtos/Cartao/ICreateOrderCartaoResponse";

@injectable()
class CreateOrderCartaoPagarmeService {
  constructor(
    @inject("EnderecosRepository")
    private enderecosRepository: IEnderecosRepository,

    @inject("UsuariosRepository")
    private usuariosRepository: IUsuariosRepository,

    @inject("PagarmeOrdersProvider")
    private pagarmeOrdersProvider: PagarmeOrdersProvider,
  ) {}

  public async execute({
    endereco_id,
    pedido_geral,
    usuario_id,
    pedido_id,
    card_id_pagarme,
    parcela_numero,
    usuario_id_pagarme,
    operation_type,
    card_cv,
  }: ICreateOrderCreditCardPagarmeDTO): Promise<ICreateOrderCartaoResponse> {
    const enderecoInfo = await this.enderecosRepository.findById(endereco_id);

    const usuarioInfo = await this.usuariosRepository.findById(usuario_id);

    if (enderecoInfo === undefined) {
      throw new AppError("Endereco ID não existe.", 200);
    }

    if (usuarioInfo === undefined) {
      throw new AppError("Usuario ID não existe.", 200);
    }

    const newItemsCartao = [
      {
        code: "0",
        quantity: 1,
        amount: Math.round((pedido_geral - 1) * 100),
        description: "Pedido Geral",
      },
    ];

    const newOrderPagarmeCredito = await this.pagarmeOrdersProvider.post_cartao(
      {
        customer_id: usuario_id_pagarme,
        metadata: {
          pedido_id,
          plataforma: "Up Tech",
          valor_pedido: pedido_geral,
          usuario_id: String(usuario_id),
          endereco_id: String(endereco_id),
        },
        shipping: {
          amount: 100,
          description: usuarioInfo.nome_completo,
          recipient_name: enderecoInfo.destinatario,
          recipient_phone: String(usuarioInfo.celular),
          address: {
            city: enderecoInfo.cidade,
            country: "BR",
            line_1: enderecoInfo.endereco,
            state: enderecoInfo.estado,
            zip_code: enderecoInfo.cep,
          },
        },
        items: newItemsCartao,
        payments: [
          {
            payment_method: "credit_card",
            credit_card: {
              card_id: card_id_pagarme,
              card: {
                cvv: card_cv,
              },
              installments: parcela_numero,
              recurrence: false,
              statement_descriptor: "Chaes",
            },
          },
        ],
      },
    );

    return newOrderPagarmeCredito;
  }
}

export default CreateOrderCartaoPagarmeService;
