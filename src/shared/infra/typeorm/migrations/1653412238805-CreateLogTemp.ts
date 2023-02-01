import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateLogTemp1653412238805 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "logs",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "responsavel",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "tela",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "acao",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("logs");
  }
}
