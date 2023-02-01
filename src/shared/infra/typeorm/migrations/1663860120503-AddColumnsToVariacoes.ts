import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnsToVariacoes1663860120503 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("variacoes", [
      new TableColumn({
        name: "foto",
        type: "varchar",
        isNullable: true,
      }),
      new TableColumn({
        name: "cor_fundo",
        type: "varchar",
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("variacoes", ["foto", "cor_fundo"]);
  }
}
