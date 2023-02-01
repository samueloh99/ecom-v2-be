import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnsPedidos1649263389991 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("pedidos", [
      new TableColumn({
        name: "status_entrega",
        type: "int",
        default: 0,
        isNullable: false,
      }),
      new TableColumn({
        name: "status_pagamento",
        type: "int",
        default: 0,
        isNullable: false,
      }),
      new TableColumn({
        name: "utm_campaign",
        type: "varchar",
      }),
      new TableColumn({
        name: "utm_source",
        type: "varchar",
      }),
      new TableColumn({
        name: "utm_medium",
        type: "varchar",
      }),
      new TableColumn({
        name: "utm_content",
        type: "varchar",
      }),
      new TableColumn({
        name: "utm_term",
        type: "varchar",
      }),
      new TableColumn({
        name: "data_aprovado",
        type: "timestamp",
      }),
      new TableColumn({
        name: "data_entrega",
        type: "timestamp",
      }),
    ]);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("pedidos", [
      "status_entrega",
      "status_pagamento",
      "utm_campaign",
      "utm_source",
      "utm_medium",
      "utm_content",
      "utm_term",
      "data_aprovado",
      "data_entrega",
    ]);
  }
}
