import Marcas from "@modules/marcas/infra/typeorm/models/Marcas";
import ICreateMarcaDTO from "@modules/marcas/dtos/ICreateMarcaDTO";

export default interface IMarcasRepository {
  create({ nome, ativo }: ICreateMarcaDTO): Promise<Marcas>;
  findByName(name: string): Promise<Marcas | undefined>;
  list(): Promise<Marcas[]>;
  delete(marca: Marcas): Promise<Marcas>;
  findById(id: number): Promise<Marcas | undefined>;
  save(data: ICreateMarcaDTO): Promise<Marcas>;
}
