export default interface ICreatePedidoProdutoDTO {
  produto_id: number;
  sku_id: number;
  quantidade: number;
  cancelado: string;
  troca: string;
  pontos: string;
  preco: number;
  total: number;
  json_pers: string;
  pedido_id: number;
  desconto_id?: number;
}
