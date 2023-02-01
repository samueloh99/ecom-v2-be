import { injectable, inject } from "tsyringe";

import ISeoSociaisRepository from "@modules/configuracoes/repositories/ISeoSociaisRepository";
import SeoSociais from "@modules/configuracoes/infra/typeorm/models/SeoSociais";
import AppError from "@shared/errors/AppError";

interface Request {
  id: number;
  google_analytics: string;
  gtm: string;
  google_ads: string;
  ads_campanha: string;
  facebook_pixel: string;
  pinterest_tag: string;
  tiktok_tag: string;
  facebook_link: string;
  instagram_link: string;
  twitter_link: string;
  youtube_link: string;
  linkedin_link: string;
  pinterest_link: string;
  whatsapp_link: string;
}

@injectable()
class UpdateSeoSociaisService {
  constructor(
    @inject("SeoSociaisRepository")
    private seoSociaisRepository: ISeoSociaisRepository,
  ) {}

  public async execute({
    id,
    google_analytics,
    gtm,
    google_ads,
    ads_campanha,
    facebook_pixel,
    pinterest_tag,
    tiktok_tag,
    facebook_link,
    instagram_link,
    twitter_link,
    youtube_link,
    linkedin_link,
    pinterest_link,
    whatsapp_link,
  }: Request): Promise<SeoSociais> {
    const findById = await this.seoSociaisRepository.findById(id);

    if (!findById) {
      throw new AppError("SeoSociais não encontrado.");
    }

    const newObj = {
      google_analytics,
      gtm,
      google_ads,
      ads_campanha,
      facebook_pixel,
      pinterest_tag,
      tiktok_tag,
      facebook_link,
      instagram_link,
      twitter_link,
      youtube_link,
      linkedin_link,
      pinterest_link,
      whatsapp_link,
    };

    Object.assign(findById, newObj);

    await this.seoSociaisRepository.save(findById);

    return findById;
  }
}

export default UpdateSeoSociaisService;
