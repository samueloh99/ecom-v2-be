import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class DropColumnsForPedidos1653052799041 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("pedidos", [
      "desconto_nome",
      "desconto_codigo",
      "desconto_valor",
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("pedidos", [
      new TableColumn({
        name: "entrega_nome",
        type: "varchar",
        isNullable: false,
      }),
      new TableColumn({
        name: "desconto_nome",
        type: "varchar",
        isNullable: false,
      }),
      new TableColumn({
        name: "desconto_codigo",
        type: "int",
        isNullable: true,
      }),
      new TableColumn({
        name: "desconto_valor",
        type: "int",
        isNullable: false,
      }),
    ]);
  }
}
