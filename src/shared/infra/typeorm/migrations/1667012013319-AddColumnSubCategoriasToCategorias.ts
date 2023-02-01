import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnSubCategoriasToCategorias1667012013319
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("produtos", [
      new TableColumn({
        name: "sub_categorias_ids",
        type: "int",
        isArray: true,
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("produtos", "sub_categorias_ids");
  }
}
