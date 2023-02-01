import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSkus1632120734077 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "skus",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "var1_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "var2_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "ativo",
            type: "int",
            default: 1,
          },
          {
            name: "referencia",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "preco_custo",
            type: "float",
            isNullable: true,
          },
          {
            name: "preco_venda",
            type: "float",
            isNullable: false,
          },
          {
            name: "produto_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "peso",
            type: "float",
            isNullable: false,
          },
          {
            name: "gtin",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "mpn",
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
    await queryRunner.dropTable("skus");
  }
}
