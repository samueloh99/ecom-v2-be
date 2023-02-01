import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CreateForeignKeyForSku1632179285437 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "skus",
      new TableForeignKey({
        name: "produtoid",
        columnNames: ["produto_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "products",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("skus", "produtoid");
  }
}
