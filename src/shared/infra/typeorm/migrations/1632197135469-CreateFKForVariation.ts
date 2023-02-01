import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CreateFKForVariation1632197135469 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "skus",
      new TableForeignKey({
        columnNames: ["var1_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "variacoes",
        name: "varFK1",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "skus",
      new TableForeignKey({
        columnNames: ["var2_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "variacoes",
        name: "varFK2",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("skus", "varFK1");
    await queryRunner.dropForeignKey("skus", "varFK2");
  }
}
