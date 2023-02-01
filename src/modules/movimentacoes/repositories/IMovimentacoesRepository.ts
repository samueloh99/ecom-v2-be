import Movimentacoes from "@modules/movimentacoes/infra/typeorm/models/Movimentacoes";
import ICreateMovimentacaoDTO from "@modules/movimentacoes/dtos/ICreateMovimentacaoDTO";
import {
  IRequest,
  IResponse,
} from "@modules/movimentacoes/dtos/IListMovimentacaoDTO";
import ICreateMovimentacaoBulkDTO from "@modules/movimentacoes/dtos/ICreateMovimentacaoBulkDTO";
import Skus from "@modules/skus/infra/typeorm/models/Skus";

export default interface IMovimentacoesRepository {
  create({
    lancamento,
    localizacao,
    quantidade,
    sku_id,
  }: ICreateMovimentacaoDTO): Promise<Movimentacoes>;

  listWithoutPagination(): Promise<Movimentacoes[]>;

  list(props: IRequest): Promise<IResponse>;

  findBySkuAndBalanceStock({
    quantidade,
    sku_id,
  }: ICreateMovimentacaoDTO): Promise<Skus>;

  findBySkuAndRemoveStock({
    quantidade,
    sku_id,
  }: ICreateMovimentacaoDTO): Promise<Skus>;

  findBySkuAndAddStock({
    quantidade,
    sku_id,
  }: ICreateMovimentacaoDTO): Promise<Skus>;

  findBySkusAndRemoveStocks(
    data: ICreateMovimentacaoBulkDTO[],
  ): Promise<Skus[]>;

  findBySku(sku_id: number): Promise<Skus | undefined>;
}
