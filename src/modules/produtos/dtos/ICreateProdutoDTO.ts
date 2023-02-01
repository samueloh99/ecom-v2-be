export default interface ICreateProdutoDTO {
  nome: string;
  slug: string;
  referencia: string;
  ncm: string;
  marca_id?: number;
  fornecedor_id?: number;
  categoria_id: number;
  comprimento: string;
  altura: string;
  largura: string;
  descricao: string;
  ativo: number;
  tipo_produto_id: number;
  sub_categorias_ids: number[];
  tags: number[];
}
