import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class EditColumnTypesPedidos1649274821102 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns("pedidos", [
      {
        oldColumn: new TableColumn({
          name: "pedido_desconto",
          type: "int",
          isNullable: false,
        }),
        newColumn: new TableColumn({
          name: "pedido_desconto",
          type: "float",
          isNullable: false,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "pedido_carteira",
          type: "int",
          isNullable: false,
        }),
        newColumn: new TableColumn({
          name: "pedido_carteira",
          type: "float",
          isNullable: false,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "pedido_total",
          type: "int",
          isNullable: false,
        }),
        newColumn: new TableColumn({
          name: "pedido_total",
          type: "float",
          isNullable: false,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "pedido_geral",
          type: "int",
          isNullable: false,
        }),
        newColumn: new TableColumn({
          name: "pedido_geral",
          type: "float",
          isNullable: false,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "frete_valor",
          type: "int",
          isNullable: false,
        }),
        newColumn: new TableColumn({
          name: "frete_valor",
          type: "float",
          isNullable: false,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "desconto_valor",
          type: "int",
          isNullable: false,
        }),
        newColumn: new TableColumn({
          name: "desconto_valor",
          type: "float",
          isNullable: false,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "parcela_valor",
          type: "int",
          isNullable: false,
        }),
        newColumn: new TableColumn({
          name: "parcela_valor",
          type: "float",
          isNullable: false,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "parcela_desconto",
          type: "int",
          isNullable: false,
        }),
        newColumn: new TableColumn({
          name: "parcela_desconto",
          type: "float",
          isNullable: false,
        }),
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns("pedidos", [
      {
        oldColumn: new TableColumn({
          name: "pedido_desconto",
          type: "float",
          isNullable: false,
        }),
        newColumn: new TableColumn({
          name: "pedido_desconto",
          type: "int",
          isNullable: false,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "pedido_carteira",
          type: "float",
          isNullable: false,
        }),
        newColumn: new TableColumn({
          name: "pedido_carteira",
          type: "int",
          isNullable: false,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "pedido_total",
          type: "float",
          isNullable: false,
        }),
        newColumn: new TableColumn({
          name: "pedido_total",
          type: "int",
          isNullable: false,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "pedido_geral",
          type: "float",
          isNullable: false,
        }),
        newColumn: new TableColumn({
          name: "pedido_geral",
          type: "int",
          isNullable: false,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "frete_valor",
          type: "float",
          isNullable: false,
        }),
        newColumn: new TableColumn({
          name: "frete_valor",
          type: "int",
          isNullable: false,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "desconto_valor",
          type: "float",
          isNullable: false,
        }),
        newColumn: new TableColumn({
          name: "desconto_valor",
          type: "int",
          isNullable: false,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "parcela_valor",
          type: "float",
          isNullable: false,
        }),
        newColumn: new TableColumn({
          name: "parcela_valor",
          type: "int",
          isNullable: false,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "parcela_desconto",
          type: "float",
          isNullable: false,
        }),
        newColumn: new TableColumn({
          name: "parcela_desconto",
          type: "int",
          isNullable: false,
        }),
      },
    ]);
  }
}
