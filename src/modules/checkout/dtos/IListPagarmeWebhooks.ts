export default interface IListPagarmeWebhook {
  data: [
    {
      id: string;
      url: string;
      event: string;
      status: string;
      attempts: string;
      last_attempt: string;
      created_at: string;
      response_status: number;
      data: {
        status: string;

        metadata: {
          pedido_id: string;
          plataforma: string;
          valor_pedido: string;
        };
      };
    },
  ];
  paging: {
    total: number;
    next: string;
  };
}
