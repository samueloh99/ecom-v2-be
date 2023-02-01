export default interface IGetOrder {
  data: [
    {
      id: string;
      code: string;
      amount: number;
      currency: string;
      closed: boolean;
      items: [
        {
          id: string;
          type: string;
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
        code: string;
        document: string;
        document_type: string;
        gender: string;
        delinquent: boolean;
        created_at: string;
        updated_at: string;
        birthdate: string;
        phones: {
          home_phone: {
            country_code: string;
            number: string;
            area_code: string;
          };
          mobile_phone: {
            country_code: string;
            number: string;
            area_code: string;
          };
        };
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
          customer: {
            id: string;
            name: string;
            email: string;
            code: string;
            document: string;
            document_type: string;
            gender: string;
            delinquent: false;
            created_at: string;
            updated_at: string;
            birthdate: string;
            phones: {
              home_phone: {
                country_code: string;
                number: string;
                area_code: string;
              };
              mobile_phone: {
                country_code: string;
                number: string;
                area_code: string;
              };
            };
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
    },
  ];
  paging: {
    total: number;
    next: string;
  };
}
