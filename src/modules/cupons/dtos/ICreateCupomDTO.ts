export default interface ICreateCupomDTO {
  tipo: number;
  ativo: number;
  data_1: Date;
  data_2: Date;
  nome: string;
  codigo: string;
  quantidade: number;
  desconto_tipo: string;
  desconto_valor: number;
  minimo_item: number;
  minimo_compra: number;
  frete_gratis: number;
  desconto_produto: number;
  desconto_pagamento: number;
  reutilizavel: number;
}
