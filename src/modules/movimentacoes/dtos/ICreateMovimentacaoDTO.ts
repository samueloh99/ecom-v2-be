export default interface ICreateMovimentacaoDTO {
  sku_id: number;
  lancamento?: string;
  quantidade: number;
  localizacao?: string;
}
