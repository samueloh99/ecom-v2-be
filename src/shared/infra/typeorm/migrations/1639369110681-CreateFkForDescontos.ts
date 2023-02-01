import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CreateFkForDescontos1639369110681 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "descontos",
      new TableForeignKey({
        name: "produtoIdFk",
        columnNames: ["produto_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "produtos",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("descontos", "produtoIdFk");
  }
}
