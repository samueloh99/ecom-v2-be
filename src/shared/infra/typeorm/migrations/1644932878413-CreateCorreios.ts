import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCorreios1644932878413 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "correios",
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
            name: "cnpj",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "cartao_postagem",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "codigo_adm",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "titular",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "central",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "usuario_sigep",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "senha_sigep",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "pac_cod",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "sedex_cod",
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
    await queryRunner.dropTable("correios");
  }
}
