export default interface ICreatePagamentoDTO {
  ativo: number;
  public_key: string;
  secret_key: string;
  prazo_boleto: number;
  prazo_pix: number;
  boleto_ativo: number;
  pix_ativo: number;
  boleto_desconto: number;
  pix_desconto: number;
}
