import { DeleteResult } from "typeorm";

import ICreateSkuDTO from "@modules/skus/dtos/ICreateSkuDTO";
import { IRequest, IResponse } from "@modules/skus/dtos/IListSkusDTO";
import Sku from "@modules/skus/infra/typeorm/models/Skus";

export default interface ISkusRepository {
  create(data: ICreateSkuDTO): Promise<Sku>;
  listWithoutPagination(): Promise<Sku[]>;
  list(props: IRequest): Promise<IResponse>;
  save(sku: Sku): Promise<Sku>;
  deleteSkuById(id: number): Promise<DeleteResult>;
  findSkuById(id: number): Promise<Sku | undefined>;
  findByProdutoId(produto_id: number): Promise<Sku[] | undefined>;
  findSkuRelatedByProdutoId(id: number): Promise<Sku[] | undefined>;
  findSkuByRef(referencia: string): Promise<Sku | undefined>;
  findSkusBySkuList(skus: string[]): Promise<Sku[]>;
  findSkuByProductRef(produto_referencia: string): Promise<Sku[]>;
  //filtro de categoria
  filterSkuByQuery(variacoes: number[], id: string): Promise<Sku[]>;
  findSkuProdutoByCatId(id: number): Promise<Sku[] | undefined>;
  filterSkuByVar1(variacoes: number[], id: number): Promise<Sku[]>;
  //home page
  filterByArrayProdRef(referencia: string[]): Promise<Sku[]>;

  updatePhotoSku(sku_id: number, foto: string, index: string): Promise<void>;
}
