import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class EditAddColumnUsuarios1649277134751 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("usuarios", [
      new TableColumn({
        name: "estrangeiro",
        type: "int",
        isNullable: false,
      }),
      new TableColumn({
        name: "cnpj",
        type: "varchar",
        isNullable: false,
      }),
      new TableColumn({
        name: "ie",
        type: "varchar",
        isNullable: false,
      }),
      new TableColumn({
        name: "im",
        type: "varchar",
        isNullable: false,
      }),
      new TableColumn({
        name: "total_pedidos",
        type: "int",
        isNullable: true,
      }),
      new TableColumn({
        name: "data_acesso",
        type: "timestamp",
        isNullable: true,
      }),
      new TableColumn({
        name: "newsletter",
        type: "int",
        isNullable: false,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("usuarios", [
      "estrangeiro",
      "cnpj",
      "ie",
      "im",
      "total_pedidos",
      "data_acesso",
      "newsletter",
    ]);
  }
}
