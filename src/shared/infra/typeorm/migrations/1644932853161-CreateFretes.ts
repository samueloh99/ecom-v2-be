import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFretes1644932853161 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "fretes",
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
            name: "compra_minima",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "compra_maxima",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "valido_de",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "valido_ate",
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
    await queryRunner.dropTable("fretes");
  }
}
