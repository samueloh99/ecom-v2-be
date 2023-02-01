import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePagamentos1644608786828 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "pagamentos",
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
            name: "public_key",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "secret_key",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "prazo_boleto",
            type: "int",
            isNullable: false,
          },
          {
            name: "prazo_pix",
            type: "int",
            isNullable: false,
          },
          {
            name: "boleto_ativo",
            type: "int",
            isNullable: false,
          },
          {
            name: "pix_ativo",
            type: "int",
            isNullable: false,
          },
          {
            name: "boleto_desconto",
            type: "int",
            isNullable: false,
          },
          {
            name: "pix_desconto",
            type: "int",
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
    await queryRunner.dropTable("pagamentos");
  }
}
