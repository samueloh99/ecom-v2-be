export default interface IResponsePagarmeWebhookOrder {
  id: string;
  account: {
    id: string;
    name: string;
  };
  type: string;
  created_at: string;
  data: {
    id: string;
    code: string;
    amount: number;
    currency: string;
    closed: boolean;
    status: string;
    created_at: string;
    updated_at: string;
    closed_at: string;
    charges: [
      {
        id: string;
        code: string;
        amount: number;
        status: string;
        currency: string;
        payment_method: string;
        created_at: string;
        updated_at: string;
        last_transaction: {
          operation_key: string;
          id: string;
          transaction_type: string;
          gateway_id: string;
          amount: number;
          status: string;
          success: boolean;
          installments: number;
          statement_descriptor: string;
          acquirer_name: string;
          acquirer_tid: string;
          acquirer_nsu: string;
          acquirer_message: string;
          acquirer_return_code: string;
          operation_type: string;
          created_at: string;
          updated_at: string;
          gateway_response: {
            code: string;
            errors: [];
          };
          antifraud_response: {};
          metadata: {};
        };
      },
    ];
    metadata: {
      pedido_id: string;
      plataforma: string;
      valor_pedido: string;
      usuario_id: string;
      endereco_id: string;
    };
  };
}
