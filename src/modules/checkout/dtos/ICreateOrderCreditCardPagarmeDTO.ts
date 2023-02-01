export default interface ICreateOrderCreditCardPagarmeDTO {
  endereco_id: number;
  pedido_geral: number;
  usuario_id: number;
  pedido_id: string;
  usuario_id_pagarme: string;
  card_id_pagarme: string;
  parcela_numero: number;
  operation_type?: string;
  card_cv: string;
}
