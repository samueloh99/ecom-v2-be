import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateTableCarteirasCliente1653229181564
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "carteiras",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "usuario_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "pedido_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "movimentacao",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "valor_carteira",
            type: "float",
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

    await queryRunner.createForeignKey(
      "carteiras",
      new TableForeignKey({
        columnNames: ["usuario_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "usuarios",
        name: "usuario_id_fk",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      }),
    );

    await queryRunner.createForeignKey(
      "carteiras",
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
    await queryRunner.dropForeignKey("carteiras", "pedido_id_fk");
    await queryRunner.dropForeignKey("carteiras", "usuario_id_fk");
    await queryRunner.dropTable("carteiras");
  }
}
