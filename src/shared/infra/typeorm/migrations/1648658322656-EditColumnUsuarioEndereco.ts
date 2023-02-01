import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class EditColumnUsuarioEndereco1648658322656
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns("enderecos", [
      {
        oldColumn: new TableColumn({
          name: "lembrete",
          type: "varchar",
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: "lembrete",
          type: "varchar",
          isNullable: false,
        }),
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns("enderecos", [
      {
        oldColumn: new TableColumn({
          name: "lembrete",
          type: "varchar",
          isNullable: false,
        }),
        newColumn: new TableColumn({
          name: "lembrete",
          type: "varchar",
          isNullable: true,
        }),
      },
    ]);
  }
}
