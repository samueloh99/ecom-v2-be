import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class DropUsuarioColumnsPedidos1649265139605
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("pedidos", [
      "usuario_grupo_id",
      "usuario_pessoa",
      "usuario_nome",
      "usuario_cpf",
      "usuario_empresa",
      "usuario_cnpj",
      "usuario_ie",
      "usuario_im",
      "usuario_email",
      "usuario_tel_1",
      "usuario_tel_2",
      "usuario_nascimento",
      "usuario_sexo",
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("pedidos", [
      new TableColumn({
        name: "usuario_grupo_id",
        type: "varchar",
        isNullable: false,
      }),
      new TableColumn({
        name: "usuario_pessoa",
        type: "varchar",
        isNullable: false,
      }),
      new TableColumn({
        name: "usuario_nome",
        type: "varchar",
        isNullable: false,
      }),
      new TableColumn({
        name: "usuario_cpf",
        type: "varchar",
        isNullable: false,
      }),
      new TableColumn({
        name: "usuario_empresa",
        type: "varchar",
        isNullable: false,
      }),
      new TableColumn({
        name: "usuario_cnpj",
        type: "varchar",
        isNullable: false,
      }),
      new TableColumn({
        name: "usuario_ie",
        type: "varchar",
        isNullable: false,
      }),
      new TableColumn({
        name: "usuario_im",
        type: "varchar",
        isNullable: false,
      }),
      new TableColumn({
        name: "usuario_email",
        type: "varchar",
        isNullable: false,
      }),
      new TableColumn({
        name: "usuario_tel_1",
        type: "varchar",
        isNullable: false,
      }),
      new TableColumn({
        name: "usuario_tel_2",
        type: "varchar",
        isNullable: false,
      }),
      new TableColumn({
        name: "usuario_nascimento",
        type: "varchar",
        isNullable: false,
      }),
      new TableColumn({
        name: "usuario_sexo",
        type: "varchar",
        isNullable: false,
      }),
    ]);
  }
}
