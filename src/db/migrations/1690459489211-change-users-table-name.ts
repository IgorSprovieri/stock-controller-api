import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeUsersTableName1690459489211 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`ALTER TABLE users RENAME TO "user"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`ALTER TABLE "user" RENAME TO users`);
  }
}
