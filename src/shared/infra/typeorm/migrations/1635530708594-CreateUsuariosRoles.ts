import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsuariosRoles1635530708594 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "usuarios_roles",
        columns: [
          { name: "role_id", type: "int" },
          { name: "usuario_id", type: "int" },
        ],
        foreignKeys: [
          {
            columnNames: ["role_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "roles",
            name: "fk_roles_usuarios",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
          },
          {
            columnNames: ["usuario_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "usuarios",
            name: "fk_usuarios_roles",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("usuarios_roles");
  }
}
