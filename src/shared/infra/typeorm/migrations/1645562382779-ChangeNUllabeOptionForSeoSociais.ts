import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class ChangeNUllabeOptionForSeoSociais1645562382779
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns("seosociais", [
      {
        oldColumn: new TableColumn({
          name: "google_analytics",
          type: "varchar",
        }),
        newColumn: new TableColumn({
          name: "google_analytics",
          type: "varchar",
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "gtm",
          type: "varchar",
        }),
        newColumn: new TableColumn({
          name: "gtm",
          type: "varchar",
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "google_ads",
          type: "varchar",
        }),
        newColumn: new TableColumn({
          name: "google_ads",
          type: "varchar",
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "ads_campanha",
          type: "varchar",
        }),
        newColumn: new TableColumn({
          name: "ads_campanha",
          type: "varchar",
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "facebook_pixel",
          type: "varchar",
        }),
        newColumn: new TableColumn({
          name: "facebook_pixel",
          type: "varchar",
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "pinterest_tag",
          type: "varchar",
        }),
        newColumn: new TableColumn({
          name: "pinterest_tag",
          type: "varchar",
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "tiktok_tag",
          type: "varchar",
        }),
        newColumn: new TableColumn({
          name: "tiktok_tag",
          type: "varchar",
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "facebook_link",
          type: "varchar",
        }),
        newColumn: new TableColumn({
          name: "facebook_link",
          type: "varchar",
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "instagram_link",
          type: "varchar",
        }),
        newColumn: new TableColumn({
          name: "instagram_link",
          type: "varchar",
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "twitter_link",
          type: "varchar",
        }),
        newColumn: new TableColumn({
          name: "twitter_link",
          type: "varchar",
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "youtube_link",
          type: "varchar",
        }),
        newColumn: new TableColumn({
          name: "youtube_link",
          type: "varchar",
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "linkedin_link",
          type: "varchar",
        }),
        newColumn: new TableColumn({
          name: "linkedin_link",
          type: "varchar",
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "pinterest_link",
          type: "varchar",
        }),
        newColumn: new TableColumn({
          name: "pinterest_link",
          type: "varchar",
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "whatsapp_link",
          type: "varchar",
        }),
        newColumn: new TableColumn({
          name: "whatsapp_link",
          type: "varchar",
          isNullable: true,
        }),
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns("seosociais", [
      {
        oldColumn: new TableColumn({
          name: "google_analytics",
          type: "varchar",
        }),
        newColumn: new TableColumn({
          name: "google_analytics",
          type: "varchar",
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "gtm",
          type: "varchar",
        }),
        newColumn: new TableColumn({
          name: "gtm",
          type: "varchar",
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "google_ads",
          type: "varchar",
        }),
        newColumn: new TableColumn({
          name: "google_ads",
          type: "varchar",
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "ads_campanha",
          type: "varchar",
        }),
        newColumn: new TableColumn({
          name: "ads_campanha",
          type: "varchar",
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "facebook_pixel",
          type: "varchar",
        }),
        newColumn: new TableColumn({
          name: "facebook_pixel",
          type: "varchar",
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "pinterest_tag",
          type: "varchar",
        }),
        newColumn: new TableColumn({
          name: "pinterest_tag",
          type: "varchar",
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "tiktok_tag",
          type: "varchar",
        }),
        newColumn: new TableColumn({
          name: "tiktok_tag",
          type: "varchar",
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "facebook_link",
          type: "varchar",
        }),
        newColumn: new TableColumn({
          name: "facebook_link",
          type: "varchar",
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "instagram_link",
          type: "varchar",
        }),
        newColumn: new TableColumn({
          name: "instagram_link",
          type: "varchar",
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "twitter_link",
          type: "varchar",
        }),
        newColumn: new TableColumn({
          name: "twitter_link",
          type: "varchar",
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "youtube_link",
          type: "varchar",
        }),
        newColumn: new TableColumn({
          name: "youtube_link",
          type: "varchar",
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "linkedin_link",
          type: "varchar",
        }),
        newColumn: new TableColumn({
          name: "linkedin_link",
          type: "varchar",
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "pinterest_link",
          type: "varchar",
        }),
        newColumn: new TableColumn({
          name: "pinterest_link",
          type: "varchar",
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "whatsapp_link",
          type: "varchar",
        }),
        newColumn: new TableColumn({
          name: "whatsapp_link",
          type: "varchar",
        }),
      },
    ]);
  }
}
