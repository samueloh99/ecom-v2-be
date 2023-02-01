import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsuariosPermissoes1635530716736
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "usuarios_permissoes",
        columns: [
          { name: "permissoes_id", type: "int" },
          { name: "usuario_id", type: "int" },
        ],
        foreignKeys: [
          {
            columnNames: ["permissoes_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "permissoes",
            name: "fk_roles_usuarios",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
          },
          {
            columnNames: ["usuario_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "usuarios",
            name: "fk_usuarios_permissoes",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("usuarios_permissoes");
  }
}
