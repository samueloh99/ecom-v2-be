import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CreateFkForPedidosEndereco1649266536334
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "pedidos",
      new TableForeignKey({
        columnNames: ["endereco_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "enderecos",
        name: "enderecoFk",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("pedidos", "enderecoFk");
  }
}
