import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CreateFKForUsuariosEnderecos1643229593664
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "enderecos",
      new TableForeignKey({
        columnNames: ["usuario_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "usuarios",
        name: "usuario_id_fk",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("enderecos", "usuario_id_fk");
  }
}
