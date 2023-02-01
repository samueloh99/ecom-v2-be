import { injectable, inject } from "tsyringe";

import ISeoSociaisRepository from "@modules/configuracoes/repositories/ISeoSociaisRepository";
import SeoSociais from "@modules/configuracoes/infra/typeorm/models/SeoSociais";
import ICreateSeoSociaisDTO from "@modules/configuracoes/dtos/ICreateSeoSociaisDTO";

@injectable()
class CreateSeoSociaisService {
  constructor(
    @inject("SeoSociaisRepository")
    private seoSociaisRepository: ISeoSociaisRepository,
  ) {}

  public async execute({
    ads_campanha,
    facebook_link,
    facebook_pixel,
    google_ads,
    google_analytics,
    gtm,
    instagram_link,
    linkedin_link,
    pinterest_link,
    pinterest_tag,
    tiktok_tag,
    twitter_link,
    whatsapp_link,
    youtube_link,
  }: ICreateSeoSociaisDTO): Promise<SeoSociais> {
    const newSeoSociais = await this.seoSociaisRepository.create({
      ads_campanha,
      facebook_link,
      facebook_pixel,
      google_ads,
      google_analytics,
      gtm,
      instagram_link,
      linkedin_link,
      pinterest_link,
      pinterest_tag,
      tiktok_tag,
      twitter_link,
      whatsapp_link,
      youtube_link,
    });

    return newSeoSociais;
  }
}

export default CreateSeoSociaisService;
