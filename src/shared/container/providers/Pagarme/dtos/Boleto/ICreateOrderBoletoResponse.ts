export default interface ICreateOrderBoletoResponse {
  id: string;
  code: string;
  amount: number;
  currency: string;
  closed: true;
  items: [
    {
      id: string;
      description: string;
      amount: number;
      quantity: number;
      status: string;
      created_at: string;
      updated_at: string;
    },
  ];
  customer: {
    id: string;
    name: string;
    email: string;
    document: string;
    type: string;
    delinquent: false;
    created_at: string;
    updated_at: string;
    phones: {};
  };
  shipping: {
    amount: number;
    description: string;
    recipient_name: string;
    recipient_phone: string;
    address: {
      city: string;
      state: string;
      country: string;
      zip_code: string;
      line_1: string;
    };
  };
  status: string;
  created_at: string;
  updated_at: string;
  closed_at: string;
  ip: string;
  session_id: string;
  device: {
    platform: string;
  };
  location: {
    latitude: string;
    longitude: string;
  };
  charges: [
    {
      id: string;
      code: string;
      gateway_id: string;
      amount: number;
      status: string;
      currency: string;
      payment_method: string;
      created_at: string;
      updated_at: string;
      customer: {
        id: string;
        name: string;
        email: string;
        document: string;
        type: string;
        delinquent: false;
        created_at: string;
        updated_at: string;
        phones: {};
      };
      last_transaction: {
        id: string;
        transaction_type: string;
        gateway_id: string;
        amount: 3090;
        status: string;
        success: true;
        url: string;
        pdf: string;
        line: string;
        barcode: string;
        qr_code: string;
        nosso_numero: string;
        type: string;
        document_number: string;
        instructions: string;
        due_at: string;
        created_at: string;
        updated_at: string;
        gateway_response: {
          code: string;
        };
        antifraud_response: {};
      };
    },
  ];
  checkouts: [];
}
