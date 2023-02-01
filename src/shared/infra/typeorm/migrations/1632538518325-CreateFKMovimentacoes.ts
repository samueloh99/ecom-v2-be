import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CreateFKMovimentacoes1632538518325 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "movimentacoes",
      new TableForeignKey({
        columnNames: ["sku_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "skus",
        name: "sku_id_movimentacoes",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("movimentacoes", "sku_id_movimentacoes");
  }
}
