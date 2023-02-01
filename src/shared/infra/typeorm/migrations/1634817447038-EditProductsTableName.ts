import { MigrationInterface, QueryRunner } from "typeorm";

export class EditProductsTableName1634817447038 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable("products", "produtos");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable("produtos", "products");
  }
}
