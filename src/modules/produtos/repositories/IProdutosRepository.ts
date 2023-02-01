import Produto from "@modules/produtos/infra/typeorm/models/Produtos";
import ICreateProdutoDTO from "@modules/produtos/dtos/ICreateProdutoDTO";
import { IResponse, IRequest } from "@modules/produtos/dtos/IListProductsDTO";

import { DeleteResult } from "typeorm";

export default interface IProdutosRepository {
  create(data: ICreateProdutoDTO): Promise<Produto>;
  deleteProdutoById(id: number): Promise<DeleteResult>;
  list(props: IRequest): Promise<IResponse>;
  listWithoutPagination(): Promise<Produto[]>;
  findByName(name: string): Promise<Produto | undefined>;
  findProdutoById(id: number): Promise<Produto | undefined>;
  save(data: Produto): Promise<Produto>;
  findProdutoByCatId(id: number): Promise<Produto[] | undefined>;
  filterByArrayProdRef(referencias: string[]): Promise<Produto[]>;
  findProductByRef(referencia: string): Promise<Produto | undefined>;
}
