import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class CreateFKForPedidosAndEditColumnType1652983925780
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns("pedidos", [
      {
        oldColumn: new TableColumn({
          name: "desconto_id",
          type: "varchar",
        }),
        newColumn: new TableColumn({
          name: "desconto_id",
          type: "int",
          isNullable: true,
        }),
      },
    ]);

    await queryRunner.createForeignKey(
      "pedidos",
      new TableForeignKey({
        columnNames: ["desconto_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "cupons",
        name: "cupom_id_fk",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("pedidos", "cupom_id_fk");
    await queryRunner.changeColumns("pedidos", [
      {
        oldColumn: new TableColumn({
          name: "desconto_id",
          type: "int",
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: "desconto_id",
          type: "varchar",
          isNullable: false,
        }),
      },
    ]);
  }
}
