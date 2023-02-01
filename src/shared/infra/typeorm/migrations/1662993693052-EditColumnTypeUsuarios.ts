import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class EditColumnTypeUsuarios1662993693052 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns("usuarios", [
      {
        oldColumn: new TableColumn({
          name: "nascimento",
          type: "date",
          isNullable: false,
        }),
        newColumn: new TableColumn({
          name: "nascimento",
          type: "varchar",
          isNullable: false,
        }),
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns("usuarios", [
      {
        oldColumn: new TableColumn({
          name: "nascimento",
          type: "varchar",
          isNullable: false,
        }),
        newColumn: new TableColumn({
          name: "nascimento",
          type: "date",
          isNullable: false,
        }),
      },
    ]);
  }
}
