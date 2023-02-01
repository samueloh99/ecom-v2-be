import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMovimentacoes1632537279393 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "movimentacoes",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "ativo",
            type: "int",
            isNullable: true,
          },
          {
            name: "sku_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "quantidade",
            type: "int",
            isNullable: false,
          },
          {
            name: "lancamento",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "localizacao",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("movimentacoes");
  }
}
