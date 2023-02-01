import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CreateForeignKey1632171357986 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "products",
      new TableForeignKey({
        name: "categoriaid",
        columnNames: ["categoria_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "categorias",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "products",
      new TableForeignKey({
        name: "fornecedorid",
        columnNames: ["fornecedor_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "fornecedores",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("products", "categoriaid");
    await queryRunner.dropForeignKey("products", "fornecedorid");
  }
}
