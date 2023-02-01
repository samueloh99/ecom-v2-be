import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateSeoSociaisService from "@modules/configuracoes/services/seosociais/CreateSeoSociaisService";
import ListSeoSociaisService from "@modules/configuracoes/services/seosociais/ListSeoSociaisService";
import UpdateSeoSociaisService from "@modules/configuracoes/services/seosociais/UpdateSeoSociaisService";
import DeleteSeoSociaisService from "@modules/configuracoes/services/seosociais/DeleteSeoSociaisService";

export default class SeoSociaisController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
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
    } = request.body;

    const createSeoSociaisService = container.resolve(CreateSeoSociaisService);

    const newSeoSociais = await createSeoSociaisService.execute({
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

    return response.json(newSeoSociais);
  }

  public async list(_: Request, response: Response): Promise<Response> {
    const listSeoSociaisService = container.resolve(ListSeoSociaisService);

    const all = await listSeoSociaisService.execute();

    return response.json(all);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteSeoSociaisService = container.resolve(DeleteSeoSociaisService);

    const deleteSeoSociais = await deleteSeoSociaisService.execute({
      id: parseInt(id),
    });

    return response.json(deleteSeoSociais);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const id = parseInt(request.params.id);
    const {
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
    } = request.body;

    const updateSeoSociaisService = container.resolve(UpdateSeoSociaisService);

    const updateSeoSociais = await updateSeoSociaisService.execute({
      id,
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

    return response.json(updateSeoSociais);
  }
}
