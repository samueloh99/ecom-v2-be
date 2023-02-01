import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddColumnAndAddFKToPedidosProdutos1652237267350
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns("pedidosProdutos", [
      {
        oldColumn: new TableColumn({
          name: "pedido_id",
          type: "varchar",
        }),
        newColumn: new TableColumn({
          name: "pedido_id",
          type: "int",
        }),
      },
    ]);

    await queryRunner.addColumn(
      "pedidosProdutos",
      new TableColumn({
        name: "desconto_id",
        type: "int",
      }),
    );

    await queryRunner.createForeignKey(
      "pedidosProdutos",
      new TableForeignKey({
        columnNames: ["desconto_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "descontos",
        name: "desconto_id_fk",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      }),
    );

    await queryRunner.createForeignKey(
      "pedidosProdutos",
      new TableForeignKey({
        columnNames: ["produto_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "produtos",
        name: "produto_id_fk",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      }),
    );

    await queryRunner.createForeignKey(
      "pedidosProdutos",
      new TableForeignKey({
        columnNames: ["sku_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "skus",
        name: "sku_id_fk",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      }),
    );

    await queryRunner.createForeignKey(
      "pedidosProdutos",
      new TableForeignKey({
        columnNames: ["pedido_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "pedidos",
        name: "pedido_id_fk",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("pedidosProdutos", "pedido_id_fk");
    await queryRunner.dropForeignKey("pedidosProdutos", "sku_id_fk");
    await queryRunner.dropForeignKey("pedidosProdutos", "produto_id_fk");
    await queryRunner.dropForeignKey("pedidosProdutos", "desconto_id_fk");
    await queryRunner.dropColumn("pedidosProdutos", "desconto_id");

    await queryRunner.changeColumns("pedidosProdutos", [
      {
        oldColumn: new TableColumn({
          name: "pedido_id",
          type: "int",
        }),
        newColumn: new TableColumn({
          name: "pedido_id",
          type: "varchar",
        }),
      },
    ]);
  }
}
