import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class DeleteColumnAndCreateFKForPedidosProdutos1652235699928
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("pedidosProdutos", [
      "tipo_id",
      "conjunto_id",
      "categoria_id",
      "fornecedor_id",
      "marca_id",
      "nome",
      "sku",
      "ncm",
      "gtin",
      "peso",
      "prazo",
      "separado",
      "deduzir",
      "preco_custo",
      "preco_venda",
      "var1_id",
      "var2_id",
      "var1_nome",
      "var2_nome",
      "desconto_valor",
      "desconto_preco",
      "desconto_produtos",
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("pedidosProdutos", [
      new TableColumn({ name: "tipo_id", type: "varchar" }),
      new TableColumn({ name: "conjunto_id", type: "int" }),
      new TableColumn({ name: "categoria_id", type: "int" }),
      new TableColumn({ name: "fornecedor_id", type: "int" }),
      new TableColumn({ name: "marca_id", type: "int" }),
      new TableColumn({ name: "nome", type: "varchar" }),
      new TableColumn({ name: "sku", type: "varchar" }),
      new TableColumn({ name: "ncm", type: "varchar" }),
      new TableColumn({ name: "gtin", type: "varchar" }),
      new TableColumn({ name: "peso", type: "varchar" }),
      new TableColumn({ name: "prazo", type: "int" }),
      new TableColumn({ name: "separado", type: "varchar" }),
      new TableColumn({ name: "deduzir", type: "varchar" }),
      new TableColumn({ name: "preco_custo", type: "int" }),
      new TableColumn({ name: "preco_venda", type: "int" }),
      new TableColumn({ name: "var1_id", type: "varchar" }),
      new TableColumn({ name: "var2_id", type: "varchar" }),
      new TableColumn({ name: "var1_nome", type: "varchar" }),
      new TableColumn({ name: "var2_nome", type: "varchar" }),
      new TableColumn({ name: "desconto_valor", type: "int" }),
      new TableColumn({ name: "desconto_preco", type: "int" }),
      new TableColumn({ name: "desconto_produtos", type: "int" }),
    ]);
  }
}
