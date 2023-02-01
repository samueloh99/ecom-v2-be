import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ChangeColumnType1639371938852 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "descontos",
      "desconto_tipo",
      new TableColumn({
        name: "desconto_tipo",
        isNullable: false,
        type: "int",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "descontos",
      "desconto_tipo",
      new TableColumn({
        name: "desconto_tipo",
        isNullable: false,
        type: "varchar",
      })
    );
  }
}
