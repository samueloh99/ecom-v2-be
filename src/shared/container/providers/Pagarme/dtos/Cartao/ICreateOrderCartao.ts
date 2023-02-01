export default interface ICreateOrderCartao {
  items: {
    code: string;
    amount: number;
    description: string;
    quantity: number;
  }[];
  customer_id: string;
  shipping: {
    amount: number;
    description: string;
    recipient_name: string;
    recipient_phone: string;
    address: {
      line_1: string;
      zip_code: string;
      city: string;
      state: string;
      country: string;
    };
  };

  payments: [
    {
      payment_method: string;
      credit_card: {
        card: {
          cvv: string;
        };
        recurrence: boolean;
        installments: number;
        statement_descriptor: string;
        card_id: string;
        operation_type?: string;
      };
    },
  ];
  metadata: {
    valor_pedido: number;
    pedido_id: string;
    plataforma: string;
    usuario_id: string;
    endereco_id: string;
  };
}
