import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDepositos1644932844971 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "depositos",
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
            isNullable: false,
          },
          {
            name: "lembrete",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "cep_deposito",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "cep_minimo",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "cep_maximo",
            type: "varchar",
            isNullable: false,
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("depositos");
  }
}
