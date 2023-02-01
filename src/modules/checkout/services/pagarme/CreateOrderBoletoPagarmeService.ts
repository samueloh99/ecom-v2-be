import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import IEnderecosRepository from "@modules/usuarios/repositories/IEnderecosRepository";
import IUsuariosRepository from "@modules/usuarios/repositories/IUsuariosRepository";

import PagarmeOrdersProvider from "@shared/container/providers/Pagarme/implementations/PagarmeOrdersProvider";

import ICreateOrderPagarmeDTO from "@modules/checkout/dtos/ICreateOrderPagarmeDTO";
import ICreateOrderBoletoResponse from "@shared/container/providers/Pagarme/dtos/Boleto/ICreateOrderBoletoResponse";

@injectable()
class CreateOrderBoletoPagarmeService {
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
    usuario_id_pagarme,
  }: ICreateOrderPagarmeDTO): Promise<ICreateOrderBoletoResponse> {
    const enderecoInfo = await this.enderecosRepository.findById(endereco_id);

    const usuarioInfo = await this.usuariosRepository.findById(usuario_id);

    if (enderecoInfo === undefined) {
      throw new AppError("Endereco ID não existe.", 200);
    }

    if (usuarioInfo === undefined) {
      throw new AppError("Usuario ID não existe.", 200);
    }

    const newItemsBoleto = [
      {
        code: "0",
        quantity: 1,
        amount: Math.round((pedido_geral - 1) * 100),
        description: "Pedido Geral",
      },
    ];

    const newOrderPagarmeBoleto = await this.pagarmeOrdersProvider.post_boleto({
      customer_id: usuario_id_pagarme,
      items: newItemsBoleto,
      metadata: {
        pedido_id,
        plataforma: "Up Tech",
        valor_pedido: pedido_geral,
        usuario_id: String(usuario_id),
        endereco_id: String(endereco_id),
      },
      payments: [
        {
          payment_method: "boleto",
          boleto: {
            document_number: pedido_id,
            due_at: new Date(),
            instructions: "Pagar até o vencimento.",
            type: "DM",
          },
        },
      ],
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
    });

    return newOrderPagarmeBoleto;
  }
}

export default CreateOrderBoletoPagarmeService;
