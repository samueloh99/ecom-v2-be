import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnAtivoToProducts1633166145417
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "products",
      new TableColumn({ name: "ativo", type: "int", default: 1 })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("products", "ativo");
  }
}
