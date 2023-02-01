import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTransmissions1665013835714 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "transmissions",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "usuario_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "pedido_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "servico",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "message",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("transmissions");
  }
}
