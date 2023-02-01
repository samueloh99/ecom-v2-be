import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class EditColumnTypePedidos1649275888872 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns("pedidos", [
      {
        oldColumn: new TableColumn({
          name: "data_aprovado",
          type: "timestamp",
          isNullable: false,
        }),
        newColumn: new TableColumn({
          name: "data_aprovado",
          type: "timestamp",
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "data_entrega",
          type: "timestamp",
          isNullable: false,
        }),
        newColumn: new TableColumn({
          name: "data_entrega",
          type: "timestamp",
          isNullable: true,
        }),
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns("pedidos", [
      {
        oldColumn: new TableColumn({
          name: "data_aprovado",
          type: "timestamp",
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: "data_aprovado",
          type: "timestamp",
          isNullable: false,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "data_entrega",
          type: "timestamp",
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: "data_entrega",
          type: "timestamp",
          isNullable: false,
        }),
      },
    ]);
  }
}
