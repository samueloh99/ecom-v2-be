import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class CreateColumnTagsForProducts1667599434038
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "produtos",
      new TableColumn({
        name: "tags",
        type: "int",
        isArray: true,
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("produtos", "tags");
  }
}
