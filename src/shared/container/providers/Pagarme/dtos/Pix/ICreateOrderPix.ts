export default interface ICreateOrderPix {
  items: {
    code: string;
    amount: number;
    description: string;
    quantity: number;
  }[];
  metadata: {
    valor_pedido: number;
    pedido_id: string;
    plataforma: string;
    usuario_id: string;
    endereco_id: string;
  };
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
      pix: {
        expires_in: string;
      };
    },
  ];
}
