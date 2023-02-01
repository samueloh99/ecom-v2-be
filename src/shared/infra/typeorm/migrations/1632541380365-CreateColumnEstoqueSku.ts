import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class CreateColumnEstoqueSku1632541380365 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "skus",
      new TableColumn({
        name: "estoque",
        type: "int",
        default: 0,
        isNullable: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("skus", "estoque");
  }
}
