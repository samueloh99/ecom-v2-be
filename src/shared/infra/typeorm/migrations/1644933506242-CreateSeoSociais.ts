import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSeoSociais1644933506242 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "seosociais",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "google_analytics",
            type: "varchar",
          },
          {
            name: "gtm",
            type: "varchar",
          },
          {
            name: "google_ads",
            type: "varchar",
          },
          {
            name: "ads_campanha",
            type: "varchar",
          },
          {
            name: "facebook_pixel",
            type: "varchar",
          },
          {
            name: "pinterest_tag",
            type: "varchar",
          },
          {
            name: "tiktok_tag",
            type: "varchar",
          },
          {
            name: "facebook_link",
            type: "varchar",
          },
          {
            name: "instagram_link",
            type: "varchar",
          },
          {
            name: "twitter_link",
            type: "varchar",
          },
          {
            name: "youtube_link",
            type: "varchar",
          },
          {
            name: "linkedin_link",
            type: "varchar",
          },
          {
            name: "pinterest_link",
            type: "varchar",
          },
          {
            name: "whatsapp_link",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("seosociais");
  }
}
