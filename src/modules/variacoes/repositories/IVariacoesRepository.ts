import Variacoes from "@modules/variacoes/infra/typeorm/models/Variacoes";
import ICreateVariacaoDTO from "@modules/variacoes/dtos/ICreateVariacaoDTO";

export default interface IVariacoesRepository {
  create(data: ICreateVariacaoDTO): Promise<Variacoes>;
  list(): Promise<Variacoes[]>;
  findByName(nome: string): Promise<Variacoes | undefined>;
  findById(id: number): Promise<Variacoes | undefined>;
  save(data: ICreateVariacaoDTO): Promise<Variacoes>;
  delete(data: Variacoes): Promise<Variacoes>;
}
