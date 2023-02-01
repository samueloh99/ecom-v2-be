import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePedidosProdutos1633462894861 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "pedidosProdutos",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "pedido_id", type: "varchar" },
          { name: "tipo_id", type: "varchar" },
          { name: "produto_id", type: "int" },
          { name: "sku_id", type: "int" },
          { name: "conjunto_id", type: "int" },
          { name: "categoria_id", type: "int" },
          { name: "fornecedor_id", type: "int" },
          { name: "marca_id", type: "int" },
          { name: "nome", type: "varchar" },
          { name: "sku", type: "varchar" },
          { name: "ncm", type: "varchar" },
          { name: "gtin", type: "varchar" },
          { name: "peso", type: "varchar" },
          { name: "prazo", type: "int" },
          { name: "separado", type: "varchar" },
          { name: "deduzir", type: "varchar" },
          { name: "quantidade", type: "int" },
          { name: "cancelado", type: "varchar" },
          { name: "troca", type: "varchar" },
          { name: "pontos", type: "varchar" },
          { name: "preco_custo", type: "int" },
          { name: "preco_venda", type: "int" },
          { name: "preco", type: "int" },
          { name: "total", type: "int" },
          { name: "desconto_valor", type: "int" },
          { name: "desconto_preco", type: "int" },
          { name: "desconto_produtos", type: "int" },
          { name: "var1_id", type: "varchar" },
          { name: "var2_id", type: "varchar" },
          { name: "var1_nome", type: "varchar" },
          { name: "var2_nome", type: "varchar" },
          { name: "json_pers", type: "varchar" },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("pedidosProdutos");
  }
}
