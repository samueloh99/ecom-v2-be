import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CreateForeignKeyForMarca1632169221214
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "products",
      new TableForeignKey({
        name: "marcaid",
        columnNames: ["marca_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "marcas",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("products", "marcaid");
  }
}
