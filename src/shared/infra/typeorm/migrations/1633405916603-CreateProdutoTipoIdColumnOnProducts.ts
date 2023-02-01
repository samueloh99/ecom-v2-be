import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class CreateProdutoTipoIdColumnOnProducts1633405916603
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "products",
      new TableColumn({ name: "tipo_produto_id", type: "int", default: 1 })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("products", "tipo_produto_id");
  }
}
