import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class DeleteColumnAitvoMovimentacao1632546759934
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("movimentacoes", "ativo");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "movimentacoes",
      new TableColumn({
        name: "ativo",
        type: "int",
        isNullable: true,
      })
    );
  }
}
