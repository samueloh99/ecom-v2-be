import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePedido1633410873140 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "pedidos",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "pedido_tipo", type: "varchar", isNullable: false },
          { name: "pedido_peso", type: "varchar", isNullable: false },
          { name: "pedido_qtde", type: "int", isNullable: false },
          { name: "pedido_prazo", type: "int", isNullable: false },
          { name: "pedido_desconto", type: "int", isNullable: false },
          { name: "pedido_carteira", type: "int", isNullable: false },
          { name: "pedido_total", type: "int", isNullable: false },
          { name: "pedido_geral", type: "int", isNullable: false },
          { name: "pedido_cancelado", type: "varchar", isNullable: false },
          { name: "usuario_id", type: "int", isNullable: false },
          { name: "usuario_grupo_id", type: "varchar", isNullable: false },
          { name: "usuario_pessoa", type: "varchar", isNullable: false },
          { name: "usuario_nome", type: "varchar", isNullable: false },
          { name: "usuario_cpf", type: "varchar", isNullable: false },
          { name: "usuario_empresa", type: "varchar", isNullable: false },
          { name: "usuario_cnpj", type: "varchar", isNullable: false },
          { name: "usuario_ie", type: "varchar", isNullable: false },
          { name: "usuario_im", type: "varchar", isNullable: false },
          { name: "usuario_email", type: "varchar", isNullable: false },
          { name: "usuario_tel_1", type: "varchar", isNullable: false },
          { name: "usuario_tel_2", type: "varchar", isNullable: false },
          { name: "usuario_nascimento", type: "varchar", isNullable: false },
          { name: "usuario_sexo", type: "varchar", isNullable: false },
          { name: "entrega_nome", type: "varchar", isNullable: false },
          { name: "entrega_cep", type: "varchar", isNullable: false },
          { name: "entrega_endereco", type: "varchar", isNullable: false },
          { name: "entrega_numero", type: "varchar", isNullable: false },
          { name: "entrega_complemento", type: "varchar", isNullable: false },
          { name: "entrega_bairro", type: "varchar", isNullable: false },
          { name: "entrega_cidade", type: "varchar", isNullable: false },
          { name: "entrega_estado", type: "varchar", isNullable: false },
          { name: "entrega_pais", type: "varchar", isNullable: false },
          { name: "entrega_lembrete", type: "varchar", isNullable: false },
          { name: "frete_nome", type: "varchar", isNullable: false },
          { name: "frete_titulo", type: "varchar", isNullable: false },
          { name: "frete_prazo", type: "int", isNullable: false },
          { name: "frete_valor", type: "int", isNullable: false },
          { name: "frete_embalagem", type: "varchar", isNullable: false },
          { name: "pagamento_nome", type: "varchar", isNullable: false },
          { name: "pagamento_titulo", type: "varchar", isNullable: false },
          { name: "pagamento_valor", type: "varchar", isNullable: false },
          { name: "pagamento_link", type: "varchar", isNullable: false },
          { name: "desconto_id", type: "varchar", isNullable: false },
          { name: "desconto_nome", type: "varchar", isNullable: false },
          { name: "desconto_codigo", type: "varchar", isNullable: false },
          { name: "desconto_valor", type: "int", isNullable: false },
          { name: "parcela_numero", type: "int", isNullable: false },
          { name: "parcela_valor", type: "int", isNullable: false },
          { name: "parcela_desconto", type: "int", isNullable: false },
          { name: "cartao_nsu", type: "varchar", isNullable: false },
          { name: "cartao_bandeira", type: "varchar", isNullable: false },
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
    await queryRunner.dropTable("pedidos");
  }
}
