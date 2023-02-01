import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class EditTypeColumnOfPedidosProdutos1652263648483
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns("pedidosProdutos", [
      {
        oldColumn: new TableColumn({
          name: "preco",
          type: "int",
        }),
        newColumn: new TableColumn({
          name: "preco",
          type: "float",
        }),
      },

      {
        oldColumn: new TableColumn({
          name: "total",
          type: "int",
        }),
        newColumn: new TableColumn({
          name: "total",
          type: "float",
        }),
      },

      {
        oldColumn: new TableColumn({
          name: "produto_id",
          type: "int",
        }),
        newColumn: new TableColumn({
          name: "produto_id",
          type: "int",
          isNullable: true,
        }),
      },

      {
        oldColumn: new TableColumn({
          name: "desconto_id",
          type: "int",
        }),
        newColumn: new TableColumn({
          name: "desconto_id",
          type: "int",
          isNullable: true,
        }),
      },

      {
        oldColumn: new TableColumn({
          name: "sku_id",
          type: "int",
        }),
        newColumn: new TableColumn({
          name: "sku_id",
          type: "int",
          isNullable: true,
        }),
      },

      {
        oldColumn: new TableColumn({
          name: "pedido_id",
          type: "int",
        }),
        newColumn: new TableColumn({
          name: "pedido_id",
          type: "int",
          isNullable: true,
        }),
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns("pedidosProdutos", [
      {
        oldColumn: new TableColumn({
          name: "preco",
          type: "float",
        }),
        newColumn: new TableColumn({
          name: "preco",
          type: "int",
        }),
      },

      {
        oldColumn: new TableColumn({
          name: "total",
          type: "float",
        }),
        newColumn: new TableColumn({
          name: "total",
          type: "int",
        }),
      },

      {
        oldColumn: new TableColumn({
          name: "produto_id",
          isNullable: true,
          type: "int",
        }),
        newColumn: new TableColumn({
          name: "produto_id",
          type: "int",
        }),
      },

      {
        oldColumn: new TableColumn({
          name: "desconto_id",
          isNullable: true,
          type: "int",
        }),
        newColumn: new TableColumn({
          name: "desconto_id",
          type: "int",
        }),
      },

      {
        oldColumn: new TableColumn({
          name: "sku_id",
          isNullable: true,
          type: "int",
        }),
        newColumn: new TableColumn({
          name: "sku_id",
          type: "int",
        }),
      },

      {
        oldColumn: new TableColumn({
          name: "pedido_id",
          isNullable: true,
          type: "int",
        }),
        newColumn: new TableColumn({
          name: "pedido_id",
          type: "int",
        }),
      },
    ]);
  }
}
