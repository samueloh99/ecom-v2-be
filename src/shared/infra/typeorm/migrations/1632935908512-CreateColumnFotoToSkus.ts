import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class CreateColumnFotoToSkus1632935908512 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "skus",
      new TableColumn({
        name: "foto1",
        type: "varchar",
        isNullable: true,
      })
    );
    await queryRunner.addColumn(
      "skus",
      new TableColumn({
        name: "foto2",
        type: "varchar",
        isNullable: true,
      })
    );
    await queryRunner.addColumn(
      "skus",
      new TableColumn({
        name: "foto3",
        type: "varchar",
        isNullable: true,
      })
    );
    await queryRunner.addColumn(
      "skus",
      new TableColumn({
        name: "foto4",
        type: "varchar",
        isNullable: true,
      })
    );
    await queryRunner.addColumn(
      "skus",
      new TableColumn({
        name: "foto5",
        type: "varchar",
        isNullable: true,
      })
    );
    await queryRunner.addColumn(
      "skus",
      new TableColumn({
        name: "foto6",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("skus", "foto1");
    await queryRunner.dropColumn("skus", "foto2");
    await queryRunner.dropColumn("skus", "foto3");
    await queryRunner.dropColumn("skus", "foto4");
    await queryRunner.dropColumn("skus", "foto5");
    await queryRunner.dropColumn("skus", "foto6");
  }
}
