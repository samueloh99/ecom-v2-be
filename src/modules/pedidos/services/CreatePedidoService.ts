import { injectable, inject } from "tsyringe";

import path from "path";

import Pedido from "@modules/pedidos/infra/typeorm/models/Pedidos";

import AppError from "@shared/errors/AppError";

import IPedidosRepository from "@modules/pedidos/repositories/IPedidosRepository";
import ICarteirasRepository from "@modules/usuarios/repositories/ICarteirasRepository";
import IEnderecosRepository from "@modules/usuarios/repositories/IEnderecosRepository";
import IUsuariosRepository from "@modules/usuarios/repositories/IUsuariosRepository";
import IMovimentacoesRepository from "@modules/movimentacoes/repositories/IMovimentacoesRepository";
import ISkusRepository from "@modules/skus/repositories/ISkusRepository";
import IPedidosProdutosRepository from "@modules/pedidosProdutos/repositories/IPedidosProdutosRepository";
import IDescontosRepository from "@modules/produtos/repositories/IDescontosRepository";

import PagarmeOrdersProvider from "@shared/container/providers/Pagarme/implementations/PagarmeOrdersProvider";
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";

import ICreatePedidoDTO from "@modules/pedidos/dtos/ICreatePedidoDTO";

@injectable()
class CreatePedidoService {
  constructor(
    @inject("PedidosRepository")
    private pedidosRepository: IPedidosRepository,

    @inject("DescontosRepository")
    private descontosRepository: IDescontosRepository,

    @inject("EnderecosRepository")
    private enderecosRepository: IEnderecosRepository,

    @inject("UsuariosRepository")
    private usuariosRepository: IUsuariosRepository,

    @inject("PagarmeOrdersProvider")
    private pagarmeOrdersProvider: PagarmeOrdersProvider,

    @inject("CarteirasRepository")
    private carteirasRepository: ICarteirasRepository,

    @inject("MovimentacoesRepository")
    private movimentacoesRepository: IMovimentacoesRepository,

    @inject("SkusRepository")
    private skusRepository: ISkusRepository,

    @inject("PedidosProdutosRepository")
    private pedidosProdutosRepository: IPedidosProdutosRepository,

    @inject("MailProvider")
    private mailProvider: IMailProvider,
  ) {}

  public async execute(data: ICreatePedidoDTO): Promise<Pedido> {
    const enderecoInfo = await this.enderecosRepository.findById(
      data.endereco_id,
    );

    const usuarioInfo = await this.usuariosRepository.findById(data.usuario_id);

    if (enderecoInfo === undefined) {
      throw new AppError("Endereco ID não existe.", 200);
    }

    if (usuarioInfo === undefined) {
      throw new AppError("Usuario ID não existe.", 200);
    }

    const newOrder = await this.pedidosRepository.create(data);

    const findOrderById = await this.pedidosRepository.findById(newOrder.id);

    if (findOrderById === undefined) {
      throw new AppError("Pedido não encontrado.", 200);
    }

    const sku = await this.skusRepository.findSkusBySkuList(
      data.produtos.map(item => item.code),
    );

    if (sku.length === 0) {
      throw new AppError("Produtos não encontrados.", 200);
    }

    if (data.pedido_carteira > 0) {
      await this.carteirasRepository.create({
        movimentacao: "saida",
        usuario_id: usuarioInfo.id,
        valor_carteira: data.pedido_carteira,
        pedido_id: newOrder.id,
      });
    }

    sku.map(async item => {
      const qty = data.produtos.find(sku => sku.code === String(item.id));
      const findDesconto =
        await this.descontosRepository.findDescountByProductId(item.produto.id);

      const precoOriginal = qty !== undefined ? qty.amount : item.preco_venda;

      await this.pedidosProdutosRepository.create({
        cancelado: "0",
        json_pers: "",
        pedido_id: newOrder.id,
        pontos: "0",
        preco: precoOriginal,
        total: precoOriginal * (qty !== undefined ? qty.quantity : 1),
        produto_id: item.produto.id,
        quantidade: qty !== undefined ? qty.quantity : 1,
        sku_id: item.id,
        troca: "0",
        desconto_id: findDesconto?.id,
      });
    });

    await this.movimentacoesRepository.findBySkusAndRemoveStocks(data.produtos);

    const createOrderTemplate = path.resolve(
      __dirname,
      "..",
      "views",
      "emails",
      "createOrder.hbs",
    );

    this.mailProvider.sendMail({
      to: {
        name: usuarioInfo.nome_completo,
        email: usuarioInfo.email,
      },
      subject: `[Lboficial] Número do Pedido ${newOrder.id}`,
      templateData: {
        file: createOrderTemplate,
      },
    });

    // switch (data.pagamento_nome) {
    //   case "pagarme_pix":
    //     const newItemsPix = [
    //       {
    //         code: "0",
    //         quantity: 1,
    //         amount: (data.pedido_geral - 1) * 100,
    //         description: "Pedido Geral",
    //       },
    //     ];

    //     const newOrderPagarmePix = await this.pagarmeOrdersProvider.post_pix({
    //       customer_id: data.usuario_id_pagarme,
    //       items: newItemsPix,
    //       payments: [
    //         {
    //           payment_method: "pix",
    //           pix: {
    //             expires_in: "172800",
    //           },
    //         },
    //       ],
    //       shipping: {
    //         amount: 100,
    //         description: usuarioInfo.nome_completo,
    //         recipient_name: enderecoInfo.destinatario,
    //         recipient_phone: String(usuarioInfo.celular),
    //         address: {
    //           city: enderecoInfo.cidade,
    //           country: "BR",
    //           line_1: enderecoInfo.endereco,
    //           state: enderecoInfo.estado,
    //           zip_code: enderecoInfo.cep,
    //         },
    //       },
    //     });

    //     return {
    //       pedidoRes: findOrderById,
    //       pagarmeRes: { orderResponse: newOrderPagarmePix },
    //     };

    //   case "pagarme_boleto":
    //     const newItemsBoleto = [
    //       {
    //         code: "0",
    //         quantity: 1,
    //         amount: (data.pedido_geral - 1) * 100,
    //         description: "Pedido Geral",
    //       },
    //     ];

    //     const newOrderPagarmeBoleto =
    //       await this.pagarmeOrdersProvider.post_boleto({
    //         customer_id: data.usuario_id_pagarme,
    //         items: newItemsBoleto,
    //         payments: [
    //           {
    //             payment_method: "boleto",
    //             boleto: {
    //               document_number: String(newOrder.id),
    //               due_at: new Date(),
    //               instructions: "Pagar até o vencimento.",
    //               type: "DM",
    //             },
    //           },
    //         ],
    //         shipping: {
    //           amount: 100,
    //           description: usuarioInfo.nome_completo,
    //           recipient_name: enderecoInfo.destinatario,
    //           recipient_phone: String(usuarioInfo.celular),
    //           address: {
    //             city: enderecoInfo.cidade,
    //             country: "BR",
    //             line_1: enderecoInfo.endereco,
    //             state: enderecoInfo.estado,
    //             zip_code: enderecoInfo.cep,
    //           },
    //         },
    //       });

    //     return {
    //       pedidoRes: findOrderById,
    //       pagarmeRes: { orderResponse: newOrderPagarmeBoleto },
    //     };

    //   case "pagarme_credito":
    //     const items = [
    //       {
    //         code: "0",
    //         quantity: 1,
    //         amount: (data.pedido_geral - 1) * 100,
    //         description: "Pedido Geral",
    //       },
    //     ];

    //     const newOrderPagarmeCredito =
    //       await this.pagarmeOrdersProvider.post_cartao({
    //         customer_id: data.usuario_id_pagarme,
    //         shipping: {
    //           amount: 100,
    //           description: usuarioInfo.nome_completo,
    //           recipient_name: enderecoInfo.destinatario,
    //           recipient_phone: String(usuarioInfo.celular),
    //           address: {
    //             city: enderecoInfo.cidade,
    //             country: "BR",
    //             line_1: enderecoInfo.endereco,
    //             state: enderecoInfo.estado,
    //             zip_code: enderecoInfo.cep,
    //           },
    //         },
    //         items: items,
    //         payments: [
    //           {
    //             payment_method: "credit_card",
    //             credit_card: {
    //               card_id: data.card_id_pagarme,
    //               installments: data.parcela_numero,
    //               recurrence: false,
    //               statement_descriptor: "LB OFICIAL Compra",
    //             },
    //           },
    //         ],
    //       });

    //     return {
    //       pedidoRes: findOrderById,
    //       pagarmeRes: { orderResponse: newOrderPagarmeCredito },
    //     };

    //   default:
    //     break;
    // }

    return newOrder;
  }
}

export default CreatePedidoService;
