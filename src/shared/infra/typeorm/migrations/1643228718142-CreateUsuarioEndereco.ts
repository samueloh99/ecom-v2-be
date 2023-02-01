import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsuarioEndereco1643228718142 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "enderecos",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "usuario_id",
            type: "int",
          },
          {
            name: "ativo",
            type: "int",
            default: 1,
          },
          {
            name: "cep",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "endereco",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "numero",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "complemento",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "bairro",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "cidade",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "estado",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "pais",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "lembrete",
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("enderecos");
  }
}
