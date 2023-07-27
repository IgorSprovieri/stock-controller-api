import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNameColumnToUserTable1690460702089
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`ALTER TABLE "user" ADD COLUMN name TEXT;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`ALTER TABLE "user" DROP COLUMN name;`);
  }
}
