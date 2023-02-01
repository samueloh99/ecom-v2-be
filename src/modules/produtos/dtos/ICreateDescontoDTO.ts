export default interface ICreateProdutoDTO {
  produto_id: number;
  desconto_tipo: number;
  desconto_valor: number;
  data_desconto_1: Date;
  data_desconto_2: Date;
}
