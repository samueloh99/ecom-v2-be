import SeoSociais from "@modules/configuracoes/infra/typeorm/models/SeoSociais";
import ICreateSeoSociaisDTO from "@modules/configuracoes/dtos/ICreateSeoSociaisDTO";

export default interface ISeoSociaisRepository {
  create(data: ICreateSeoSociaisDTO): Promise<SeoSociais>;
  list(): Promise<SeoSociais[]>;
  delete(seosociais: SeoSociais): Promise<SeoSociais>;
  save(data: ICreateSeoSociaisDTO): Promise<SeoSociais>;
  findById(id: number): Promise<SeoSociais | undefined>;
}
