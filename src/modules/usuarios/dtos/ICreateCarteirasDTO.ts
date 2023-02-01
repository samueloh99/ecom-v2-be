export default interface ICreateCarteirasDTO {
  pedido_id?: number;
  usuario_id: number;
  valor_carteira: number;
  movimentacao: string;
}
