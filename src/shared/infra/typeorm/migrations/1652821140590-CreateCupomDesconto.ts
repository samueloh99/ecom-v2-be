import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCupomDesconto1652821140590 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cupons",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "tipo",
            type: "int",
          },
          {
            name: "ativo",
            type: "int",
          },
          {
            name: "data_1",
            type: "timestamp",
          },
          {
            name: "data_2",
            type: "timestamp",
          },
          {
            name: "nome",
            type: "varchar",
          },
          {
            name: "codigo",
            type: "varchar",
          },
          {
            name: "quantidade",
            type: "int",
          },
          {
            name: "desconto_tipo",
            type: "varchar",
          },
          {
            name: "desconto_valor",
            type: "float",
          },
          {
            name: "minimo_item",
            type: "int",
          },
          {
            name: "minimo_compra",
            type: "float",
          },
          {
            name: "frete_gratis",
            type: "int",
          },
          {
            name: "desconto_produto",
            type: "int",
          },
          {
            name: "desconto_pagamento",
            type: "int",
          },
          {
            name: "reutilizavel",
            type: "int",
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
    await queryRunner.dropTable("cupom");
  }
}
