import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePermissoesRoles1635530682234 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "permissoes_roles",
        columns: [
          { name: "role_id", type: "int" },
          { name: "permissoes_id", type: "int" },
        ],
        foreignKeys: [
          {
            columnNames: ["permissoes_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "permissoes",
            name: "fk_permissoes_roles",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
          },
          {
            columnNames: ["role_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "roles",
            name: "fk_roles_permissoes",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("permissoes_roles");
  }
}
