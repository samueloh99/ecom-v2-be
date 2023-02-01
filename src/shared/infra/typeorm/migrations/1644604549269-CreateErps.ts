import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateErps1644604549269 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "erps",
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
            name: "api_key",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "codigo_deposito",
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
    await queryRunner.dropTable("erps");
  }
}
