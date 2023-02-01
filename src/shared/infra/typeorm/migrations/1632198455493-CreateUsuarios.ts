import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsuarios1632198455493 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "usuarios",
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
            default: 1,
          },
          {
            name: "admin",
            type: "int",
            default: "0",
          },
          {
            name: "nome_completo",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "senha",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "celular",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "telefone",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cpf",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "nascimento",
            type: "date",
            isNullable: false,
          },
          {
            name: "genero",
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
    await queryRunner.dropTable("usuarios");
  }
}
