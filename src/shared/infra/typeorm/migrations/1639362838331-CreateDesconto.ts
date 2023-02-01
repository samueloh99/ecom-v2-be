import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDesconto1639362838331 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "descontos",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "produto_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "desconto_tipo",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "desconto_valor",
            type: "int",
            isNullable: false,
          },
          {
            name: "data_desconto_1",
            type: "timestamp",
            isNullable: false,
          },
          {
            name: "data_desconto_2",
            type: "timestamp",
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
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("descontos");
  }
}
