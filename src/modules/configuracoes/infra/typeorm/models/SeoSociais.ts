import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("seosociais")
class SeoSociais {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  google_analytics: string;

  @Column()
  gtm: string;

  @Column()
  google_ads: string;

  @Column()
  ads_campanha: string;

  @Column()
  facebook_pixel: string;

  @Column()
  pinterest_tag: string;

  @Column()
  tiktok_tag: string;

  @Column()
  facebook_link: string;

  @Column()
  instagram_link: string;

  @Column()
  twitter_link: string;

  @Column()
  youtube_link: string;

  @Column()
  linkedin_link: string;

  @Column()
  pinterest_link: string;

  @Column()
  whatsapp_link: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default SeoSociais;
