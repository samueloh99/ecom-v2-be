import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CreateFKForFavoritos1638473928566 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "favoritos",
      new TableForeignKey({
        columnNames: ["sku_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "skus",
        name: "sku_id_fk",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "favoritos",
      new TableForeignKey({
        columnNames: ["usuario_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "usuarios",
        name: "usuario_id_fk",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("favoritos", "sku_id_fk");
    await queryRunner.dropForeignKey("favoritos", "usuario_id_fk");
  }
}
