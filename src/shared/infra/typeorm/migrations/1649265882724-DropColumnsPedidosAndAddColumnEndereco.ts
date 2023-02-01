import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class DropColumnsPedidosAndAddColumnEndereco1649265882724
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("pedidos", [
      "entrega_nome",
      "entrega_cep",
      "entrega_endereco",
      "entrega_numero",
      "entrega_complemento",
      "entrega_bairro",
      "entrega_cidade",
      "entrega_estado",
      "entrega_pais",
      "entrega_lembrete",
    ]);

    await queryRunner.addColumn(
      "pedidos",
      new TableColumn({ name: "endereco_id", type: "int", isNullable: false }),
    );

    await queryRunner.addColumn(
      "enderecos",
      new TableColumn({
        name: "destinatario",
        type: "varchar",
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("pedidos", [
      new TableColumn({
        name: "entrega_nome",
        type: "varchar",
        isNullable: false,
      }),
      new TableColumn({
        name: "entrega_cep",
        type: "varchar",
        isNullable: false,
      }),
      new TableColumn({
        name: "entrega_endereco",
        type: "varchar",
        isNullable: false,
      }),
      new TableColumn({
        name: "entrega_numero",
        type: "varchar",
        isNullable: false,
      }),
      new TableColumn({
        name: "entrega_complemento",
        type: "varchar",
        isNullable: false,
      }),
      new TableColumn({
        name: "entrega_bairro",
        type: "varchar",
        isNullable: false,
      }),
      new TableColumn({
        name: "entrega_cidade",
        type: "varchar",
        isNullable: false,
      }),
      new TableColumn({
        name: "entrega_estado",
        type: "varchar",
        isNullable: false,
      }),
      new TableColumn({
        name: "entrega_pais",
        type: "varchar",
        isNullable: false,
      }),
      new TableColumn({
        name: "entrega_lembrete",
        type: "varchar",
        isNullable: false,
      }),
    ]);

    await queryRunner.dropColumn("pedidos", "endereco_id");
    await queryRunner.dropColumn("endereco", "destinatario");
  }
}
