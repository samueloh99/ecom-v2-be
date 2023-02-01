import { MigrationInterface, QueryRunner } from "typeorm";

export class EditColumnAdminNameFromUsuarios1633166323440
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn("usuarios", "admin", "tipo");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn("usuarios", "tipo", "admin");
  }
}
