import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProducts1632117337112 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "products",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "nome",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "slug",
            type: "varchar",
          },
          {
            name: "referencia",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "ncm",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "marca_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "fornecedor_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "categoria_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "comprimento",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "altura",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "largura",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "descricao",
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
    await queryRunner.dropTable("products");
  }
}
